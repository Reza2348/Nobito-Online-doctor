import OpenAI from "openai";
import { createClient } from "@/lib/supabaseServer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("===== SUPPORT AI STARTED =====");

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is missing");

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

    const message = String(body.message || "").trim();
    const conversationId = body.conversationId || null;

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

    console.log("MESSAGE:", message);

    // ---------------------------------------------------------
    // Supabase / Authentication
    // ---------------------------------------------------------

    const supabase = await createClient();

    let user = null;

    try {
      const { data, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.warn("AUTH WARNING:", authError.message);
      }

      user = data?.user ?? null;
    } catch (error) {
      console.warn("AUTH CHECK FAILED:", error);
    }

    console.log("USER:", user?.id || "GUEST");

    // ---------------------------------------------------------
    // Conversation
    //
    // Guest:
    //   No conversation is created.
    //
    // Logged in:
    //   Create conversation if needed.
    // ---------------------------------------------------------

    let currentConversationId = conversationId;

    if (user) {
      if (!currentConversationId) {
        console.log("CREATING USER CONVERSATION...");

        const { data: conversation, error: conversationError } = await supabase
          .from("support_conversations")
          .insert({
            user_id: user.id,
            status: "ai",
          })
          .select("id")
          .single();

        if (conversationError) {
          console.error("CREATE CONVERSATION ERROR:", conversationError);

          return Response.json(
            {
              error: "ساخت مکالمه ناموفق بود.",
              details: conversationError.message,
              code: conversationError.code,
              hint: conversationError.hint,
            },
            {
              status: 500,
            },
          );
        }

        currentConversationId = conversation.id;

        console.log("CONVERSATION CREATED:", currentConversationId);
      }
    }

    // ---------------------------------------------------------
    // Save user message
    // ---------------------------------------------------------

    if (user && currentConversationId) {
      const { error: userMessageError } = await supabase
        .from("support_messages")
        .insert({
          conversation_id: currentConversationId,
          role: "user",
          content: message,
        });

      if (userMessageError) {
        console.error("SAVE USER MESSAGE ERROR:", userMessageError);

        return Response.json(
          {
            error: "ذخیره پیام کاربر ناموفق بود.",
            details: userMessageError.message,
            code: userMessageError.code,
          },
          {
            status: 500,
          },
        );
      }
    }

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
        console.warn("HISTORY ERROR:", historyError);
      } else {
        history =
          messages?.map((msg) => ({
            role:
              msg.role === "assistant"
                ? ("assistant" as const)
                : ("user" as const),
            content: msg.content,
          })) || [];
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
      console.warn("FAQ ERROR:", faqError);
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
      console.warn("KNOWLEDGE ERROR:", knowledgeError);
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

    console.log("CALLING OPENAI...");

    // ---------------------------------------------------------
    // OpenAI
    // ---------------------------------------------------------

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

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

${faqContext}

اطلاعات سایت:

${knowledgeContext}
        `,

      input,
    });

    console.log("OPENAI RESPONSE RECEIVED");

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
        console.error("SAVE AI MESSAGE ERROR:", assistantMessageError);

        return Response.json(
          {
            error: "پاسخ دریافت شد اما ذخیره آن ناموفق بود.",
            details: assistantMessageError.message,
            code: assistantMessageError.code,
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
  } catch (error) {
    console.error("SUPPORT AI FATAL ERROR:", error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطای ناشناخته در سیستم پشتیبانی.",
      },
      {
        status: 500,
      },
    );
  }
}
