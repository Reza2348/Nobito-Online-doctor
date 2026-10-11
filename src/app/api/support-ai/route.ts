import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";
import { createRateLimiter, getClientIp } from "@/lib/rateLimit";

const supportAiRateLimiter = createRateLimiter("support-ai:ip", 10, "10 m");
const supportAiDailyLimiter = createRateLimiter("support-ai:global", Number(process.env.SUPPORT_AI_DAILY_LIMIT || 500), "1 d");
const MAX_BODY_BYTES = 16 * 1024;
const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_MESSAGES = 10;
const MAX_HISTORY_CHARS = 10000;
const MAX_CONTEXT_CHARS = 12000;
const MAX_OUTPUT_TOKENS = 500;

export async function POST(req: NextRequest) {
  try {
    if (!supportAiRateLimiter || !supportAiDailyLimiter) {
      if (process.env.NODE_ENV === "production") {
        console.error("[support-ai] rate limiter is not configured");
        return NextResponse.json({ error: "سرویس موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید." }, { status: 503 });
      }
      console.warn("[support-ai] rate limiter is not configured; development bypass only");
    } else {
      try {
        const ipResult = await supportAiRateLimiter.limit(`ip:${getClientIp(req)}`);
        if (!ipResult.success) {
          const retryAfter = Math.max(1, Math.ceil((ipResult.reset - Date.now()) / 1000));
          return NextResponse.json(
            { error: "تعداد درخواست‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید." },
            { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } },
          );
        }

        // Global daily request budget is a coarse server-side cost guard.
        const dailyResult = await supportAiDailyLimiter.limit("all-users");
        if (!dailyResult.success) {
          const retryAfter = Math.max(1, Math.ceil((dailyResult.reset - Date.now()) / 1000));
          return NextResponse.json(
            { error: "ظرفیت روزانه دستیار تکمیل شده است. لطفاً بعداً تلاش کنید." },
            { status: 429, headers: { "Retry-After": String(retryAfter), "Cache-Control": "no-store" } },
          );
        }
      } catch {
        console.error("[support-ai] rate limiter request failed");
        return NextResponse.json({ error: "سرویس موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید." }, { status: 503 });
      }
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("[support-ai] OpenAI configuration is missing");

      return Response.json(
        {
          error: "کلید OPENAI_API_KEY تنظیم نشده است.",
        },
        {
          status: 500,
        },
      );
    }

    // ---------------------------------------------------------
    // Request body
    // ---------------------------------------------------------

    let body: {
      message?: string;
      conversationId?: string | null;
    };

    try {
      body = await req.json();
    } catch (error) {
      console.error("BODY JSON ERROR:", error);

      return Response.json(
        {
          error: "اطلاعات ارسال‌شده معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body || typeof body !== "object" || typeof body.message !== "string") {
      return NextResponse.json({ error: "متن پیام معتبر نیست." }, { status: 400 });
    }

    const message = body.message.trim();
    if (message.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `طول پیام نباید بیشتر از ${MAX_MESSAGE_CHARS} نویسه باشد.` },
        { status: 413 },
      );
    }

    const conversationId =
      typeof body.conversationId === "string" && body.conversationId.length <= 100
        ? body.conversationId
        : null;

    if (!message) {
      return Response.json(
        {
          error: "پیام خالی است.",
        },
        {
          status: 400,
        },
      );
    }


    // ---------------------------------------------------------
    // Supabase / Authentication
    // ---------------------------------------------------------

    const supabase = await createClient();

    let user = null;

    try {
      const { data, error: authError } = await supabase.auth.getUser();

      if (authError) console.warn("[support-ai] authentication lookup returned an error");

      user = data?.user ?? null;
    } catch {
      console.warn("[support-ai] authentication lookup failed");
    }

    // ---------------------------------------------------------
    // Conversation
    //
    // Guest:
    //   No conversation is created.
    //
    // Logged in:
    //   Create conversation if needed.
    // ---------------------------------------------------------

    let currentConversationId: string | null = null;

    if (user) {
      if (conversationId) {
        const { data: ownedConversation, error: ownershipError } = await supabase
          .from("support_conversations")
          .select("id")
          .eq("id", conversationId)
          .eq("user_id", user.id)
          .maybeSingle();
        if (ownershipError || !ownedConversation) {
          return NextResponse.json({ error: "مکالمه موردنظر پیدا نشد." }, { status: 404 });
        }
        currentConversationId = ownedConversation.id;
      }
      if (!currentConversationId) {

        const { data: conversation, error: conversationError } = await supabase
          .from("support_conversations")
          .insert({
            user_id: user.id,
            status: "ai",
          })
          .select("id")
          .single();

        if (conversationError) {
          console.error("[support-ai] conversation creation failed");

          return Response.json(
            {
              error: "ساخت مکالمه ناموفق بود.",
            },
            {
              status: 500,
            },
          );
        }

        currentConversationId = conversation.id;

      }
    }

    // ---------------------------------------------------------
    // Save user message
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // Conversation history
    // ---------------------------------------------------------

    let history: Array<{
      role: "user" | "assistant";
      content: string;
    }> = [];

    if (user && currentConversationId) {
      const { data: messages, error: historyError } = await supabase
        .from("support_messages")
        .select("role, content")
        .eq("conversation_id", currentConversationId)
        .order("created_at", {
          ascending: true,
        })
        .limit(30);

      if (historyError) {
        console.warn("[support-ai] conversation history lookup failed");
      } else {
        let remainingChars = MAX_HISTORY_CHARS;
        history = (messages || []).slice(-MAX_HISTORY_MESSAGES).map((msg) => {
          const content = String(msg.content || "").slice(0, Math.min(2000, remainingChars));
          remainingChars -= content.length;
          return { role: msg.role === "assistant" ? ("assistant" as const) : ("user" as const), content };
        }).filter((msg) => msg.content.length > 0).slice(-MAX_HISTORY_MESSAGES);
      }
    }

    if (user && currentConversationId) {
      const { error: userMessageError } = await supabase
        .from("support_messages")
        .insert({
          conversation_id: currentConversationId,
          role: "user",
          content: message,
        });

      if (userMessageError) {
        console.error("[support-ai] saving user message failed");

        return NextResponse.json(
          {
            error: "ذخیره پیام کاربر ناموفق بود.",
          },
          {
            status: 500,
          },
        );
      }
    }

    // ---------------------------------------------------------
    // FAQ
    // ---------------------------------------------------------

    const { data: faqs, error: faqError } = await supabase
      .from("support_faqs")
      .select("question, answer, category")
      .eq("is_active", true)
      .limit(30);

    if (faqError) {
      console.warn("[support-ai] FAQ lookup failed");
    }

    // ---------------------------------------------------------
    // AI knowledge
    // ---------------------------------------------------------

    const { data: knowledge, error: knowledgeError } = await supabase
      .from("ai_knowledge")
      .select("title, content, category")
      .eq("is_active", true)
      .limit(50);

    if (knowledgeError) {
      console.warn("[support-ai] knowledge lookup failed");
    }

    // ---------------------------------------------------------
    // Context
    // ---------------------------------------------------------

    const faqContext =
      faqs
        ?.map((faq) => `سؤال: ${faq.question}\nپاسخ: ${faq.answer}`)
        .join("\n\n") || "";

    const knowledgeContext =
      knowledge
        ?.map((item) => `عنوان: ${item.title}\nمحتوا: ${item.content}`)
        .join("\n\n") || "";
    const boundedFaqContext = faqContext.slice(0, Math.floor(MAX_CONTEXT_CHARS / 2));
    const boundedKnowledgeContext = knowledgeContext.slice(0, Math.floor(MAX_CONTEXT_CHARS / 2));

    // ---------------------------------------------------------
    // AI input
    // ---------------------------------------------------------

    const input = [
      ...history,
      {
        role: "user" as const,
        content: message,
      },
    ];


    // ---------------------------------------------------------
    // OpenAI
    // ---------------------------------------------------------

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      max_output_tokens: MAX_OUTPUT_TOKENS,

      instructions: `
تو دستیار هوشمند پشتیبانی وب‌سایت نوبیتو هستی.

قوانین:

1. همیشه فارسی و محترمانه پاسخ بده.

2. پاسخ‌ها کوتاه، واضح و کاربردی باشند.

3. اگر اطلاعات قطعی درباره سایت در context وجود ندارد، حدس نزن.

4. اطلاعات ساختگی درباره خدمات سایت تولید نکن.

5. اگر سؤال با اطلاعات موجود قابل پاسخ‌گویی است، مستقیم و دقیق پاسخ بده.

6. اگر موضوع نیاز به بررسی انسانی دارد، به کاربر پیشنهاد بده با پشتیبان انسانی صحبت کند.

7. اگر پاسخ سؤال به بررسی حساب کاربر، وضعیت یک درخواست خاص، بررسی تراکنش، بررسی اطلاعات خصوصی، اقدام دستی یا بررسی فنی پیچیده نیاز دارد، ادعا نکن که خودت می‌توانی این کار را انجام دهی؛ کاربر را به پشتیبان انسانی راهنمایی کن.

8. اگر نمی‌توانی با اطمینان پاسخ بدهی، اطلاعات ساختگی تولید نکن و پیشنهاد ارتباط با پشتیبان انسانی بده.

9. کاربر مهمان می‌تواند از دستیار هوشمند استفاده کند.

10. برای ارتباط با پشتیبان انسانی، کاربر باید وارد حساب خود شده باشد.

11. خودت را پشتیبان انسانی معرفی نکن.

12. خودت درخواست پشتیبان انسانی را ثبت نکن. فقط کاربر را راهنمایی کن که گزینه «تماس با پشتیبان انسانی» را انتخاب کند.

13. اگر کاربر سلام کرد، دوستانه پاسخ بده.

14. اگر سؤال ساده است، مستقیم پاسخ بده.

15. اگر کاربر سؤال‌های پیچیده یا خارج از اطلاعات موجود پرسید، می‌توانی بگویی:
«برای این سؤال، پیشنهاد می‌کنم با پشتیبان انسانی صحبت کنید تا دقیق‌تر راهنمایی‌تان کند. برای ارتباط با پشتیبان انسانی، گزینه «تماس با پشتیبان انسانی» را انتخاب کنید.»

اطلاعات FAQ سایت:

${boundedFaqContext}

اطلاعات سایت:

${boundedKnowledgeContext}
        `,

      input,
    });


    const reply =
      response.output_text?.trim() ||
      "متأسفم، در حال حاضر نتوانستم پاسخ مناسبی پیدا کنم.";

    // ---------------------------------------------------------
    // Save assistant message
    // ---------------------------------------------------------

    if (user && currentConversationId) {
      const { error: assistantMessageError } = await supabase
        .from("support_messages")
        .insert({
          conversation_id: currentConversationId,
          role: "assistant",
          content: reply,
        });

      if (assistantMessageError) {
        console.error("[support-ai] saving assistant response failed");

        return Response.json(
          {
            error: "پاسخ دریافت شد اما ذخیره آن ناموفق بود.",
          },
          {
            status: 500,
          },
        );
      }
    }

    // ---------------------------------------------------------
    // Response
    // ---------------------------------------------------------

    return Response.json({
      success: true,
      reply,

      // Guest => null
      // Logged-in => conversation ID
      conversationId: user ? currentConversationId : null,

      isGuest: !user,
    });
  } catch {
    console.error("[support-ai] request failed");
    return NextResponse.json(
      {
        error: "در حال حاضر امکان پاسخ‌گویی وجود ندارد. لطفاً کمی بعد دوباره تلاش کنید.",
      },
      {
        status: 500,
      },
    );
  }
}
