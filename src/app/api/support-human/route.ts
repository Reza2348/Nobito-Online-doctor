import { createClient } from "@/lib/supabaseServer";
import { Resend } from "resend";

const TIME_ZONE = "Asia/Tehran";

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

// شنبه = 6
// یکشنبه = 0
// دوشنبه = 1
// سه‌شنبه = 2
// چهارشنبه = 3
// پنجشنبه = 4
// جمعه = 5
//
// جمعه تعطیل در نظر گرفته شده است.
const WORKING_DAYS = new Set([
  0, // یکشنبه
  1, // دوشنبه
  2, // سه‌شنبه
  3, // چهارشنبه
  4, // پنجشنبه
  6, // شنبه
]);

const getTehranDateParts = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(new Date());

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";

  const weekday = getPart("weekday");
  const hour = Number(getPart("hour"));
  const minute = Number(getPart("minute"));

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    weekday: weekdayMap[weekday] ?? -1,
    hour,
    minute,
  };
};

const isSupportAvailable = () => {
  const { weekday, hour, minute } = getTehranDateParts();

  if (!WORKING_DAYS.has(weekday)) {
    return false;
  }

  const currentMinutes = hour * 60 + minute;
  const startMinutes = WORK_START_HOUR * 60;
  const endMinutes = WORK_END_HOUR * 60;

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
};

// جلوگیری از خراب شدن HTML ایمیل
const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // --------------------------------------------------------
    // Authentication
    // --------------------------------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("SUPABASE AUTH ERROR:", authError);

      return Response.json(
        {
          error: "خطا در بررسی حساب کاربری.",
        },
        {
          status: 500,
        },
      );
    }

    // --------------------------------------------------------
    // Guest cannot request human support
    // --------------------------------------------------------

    if (!user) {
      return Response.json(
        {
          error:
            "برای ارتباط با پشتیبان انسانی، ابتدا وارد حساب کاربری خود شوید؛ سپس گزینه «تماس با پشتیبان انسانی» را انتخاب کنید تا درخواستتان برای تیم پشتیبانی ارسال شود. پشتیبانی انسانی در روزهای کاری از ساعت ۹ تا ۱۸ پاسخ‌گو است.",
        },
        {
          status: 401,
        },
      );
    }

    // --------------------------------------------------------
    // Read request
    // --------------------------------------------------------

    let body: {
      conversationId?: string;
    };

    try {
      body = await req.json();
    } catch {
      return Response.json(
        {
          error: "اطلاعات ارسال‌شده معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const conversationId = String(body.conversationId || "").trim();

    if (!conversationId) {
      return Response.json(
        {
          error:
            "ابتدا یک گفتگو با دستیار هوشمند شروع کنید و سپس درخواست پشتیبان انسانی بدهید.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------------
    // Verify conversation belongs to current user
    // --------------------------------------------------------

    const { data: conversation, error: conversationError } = await supabase
      .from("support_conversations")
      .select("id, user_id, status")
      .eq("id", conversationId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (conversationError) {
      console.error("CONVERSATION CHECK ERROR:", conversationError);

      return Response.json(
        {
          error: "بررسی گفت‌وگو ناموفق بود.",
        },
        {
          status: 500,
        },
      );
    }

    if (!conversation) {
      return Response.json(
        {
          error: "گفتگوی موردنظر پیدا نشد یا متعلق به حساب شما نیست.",
        },
        {
          status: 404,
        },
      );
    }

    // --------------------------------------------------------
    // اگر قبلاً درخواست پشتیبان ثبت شده
    // --------------------------------------------------------

    if (conversation.status === "waiting_human") {
      return Response.json({
        success: true,
        alreadyRequested: true,
        supportAvailable: isSupportAvailable(),
        message:
          "درخواست پشتیبان انسانی شما قبلاً ثبت شده است. پیام‌های بعدی شما نیز در همین گفتگو ثبت می‌شوند.",
      });
    }

    // --------------------------------------------------------
    // Check working hours
    // --------------------------------------------------------

    const supportAvailable = isSupportAvailable();

    // --------------------------------------------------------
    // گرفتن آخرین پیام کاربر برای قرار دادن در ایمیل
    // --------------------------------------------------------

    const { data: lastUserMessage } = await supabase
      .from("support_messages")
      .select("content, created_at")
      .eq("conversation_id", conversation.id)
      .eq("role", "user")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    const lastMessage = lastUserMessage?.content || "پیامی ثبت نشده است.";

    // --------------------------------------------------------
    // Update conversation
    // --------------------------------------------------------

    const { error: updateError } = await supabase
      .from("support_conversations")
      .update({
        status: "waiting_human",
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversation.id)
      .eq("user_id", user.id);

    if (updateError) {
      console.error("HUMAN SUPPORT UPDATE ERROR:", updateError);

      return Response.json(
        {
          error: "ثبت درخواست ناموفق بود.",
        },
        {
          status: 500,
        },
      );
    }

    // --------------------------------------------------------
    // اگر داخل ساعت کاری هستیم
    // --------------------------------------------------------

    if (supportAvailable) {
      return Response.json({
        success: true,
        supportAvailable: true,
        emailSent: false,
        workingHours: {
          start: "09:00",
          end: "18:00",
          timeZone: TIME_ZONE,
        },
        message:
          "پیام شما ثبت شد. پشتیبانی انسانی در ساعات کاری فعال است و درخواست شما در اولین فرصت بررسی می‌شود.",
      });
    }

    // --------------------------------------------------------
    // خارج از ساعت کاری
    // ارسال ایمیل به تیم پشتیبانی
    // --------------------------------------------------------

    let emailSent = false;

    const resendApiKey = process.env.RESEND_API_KEY;

    const supportEmail = process.env.SUPPORT_EMAIL;

    const resendFrom = process.env.RESEND_FROM;

    if (resendApiKey && supportEmail && resendFrom) {
      try {
        const resend = new Resend(resendApiKey);

        const tehranDate = new Intl.DateTimeFormat("fa-IR", {
          timeZone: TIME_ZONE,
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date());

        const result = await resend.emails.send({
          from: resendFrom,
          to: supportEmail,
          subject: "درخواست جدید پشتیبانی انسانی - خارج از ساعت کاری",

          html: `
              <div
                dir="rtl"
                style="
                  font-family: Arial, sans-serif;
                  max-width: 700px;
                  margin: 0 auto;
                  line-height: 1.8;
                  color: #222;
                "
              >
                <h2>
                  درخواست جدید پشتیبانی انسانی
                </h2>

                <p>
                  یک کاربر خارج از ساعت کاری درخواست
                  پشتیبانی انسانی داده است.
                </p>

                <hr />

                <p>
                  <strong>ایمیل کاربر:</strong>
                  ${escapeHtml(user.email || "ثبت نشده")}
                </p>

                <p>
                  <strong>شناسه کاربر:</strong>
                  ${escapeHtml(user.id)}
                </p>

                <p>
                  <strong>شناسه گفتگو:</strong>
                  ${escapeHtml(conversation.id)}
                </p>

                <p>
                  <strong>زمان درخواست:</strong>
                  ${escapeHtml(tehranDate)}
                </p>

                <p>
                  <strong>
                    آخرین پیام کاربر:
                  </strong>
                </p>

                <div
                  style="
                    background: #f5f5f5;
                    padding: 16px;
                    border-radius: 8px;
                    white-space: pre-wrap;
                  "
                >
                  ${escapeHtml(lastMessage)}
                </div>

                <hr />

                <p>
                  <strong>
                    ساعت کاری:
                  </strong>
                  ۹ تا ۱۸
                </p>

                <p>
                  <strong>
                    منطقه زمانی:
                  </strong>
                  Asia/Tehran
                </p>

                <p>
                  وضعیت گفتگو:
                  <strong>
                    waiting_human
                  </strong>
                </p>
              </div>
            `,
        });

        if (result.error) {
          console.error("RESEND EMAIL ERROR:", result.error);
        } else {
          emailSent = true;

          console.log("SUPPORT EMAIL SENT:", result.data?.id);
        }
      } catch (emailError) {
        console.error("SUPPORT EMAIL FAILED:", emailError);
      }
    } else {
      console.warn("Resend environment variables are missing.");
    }

    // --------------------------------------------------------
    // Response
    // --------------------------------------------------------

    return Response.json({
      success: true,
      supportAvailable: false,
      emailSent,
      workingHours: {
        start: "09:00",
        end: "18:00",
        timeZone: TIME_ZONE,
      },
      message:
        "پشتیبانی انسانی در حال حاضر خارج از ساعت کاری است. درخواست شما با موفقیت ثبت شد و در ساعات کاری توسط تیم پشتیبانی بررسی خواهد شد.",
    });
  } catch (error) {
    console.error("HUMAN SUPPORT FATAL ERROR:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "خطای سرور",
      },
      {
        status: 500,
      },
    );
  }
}
