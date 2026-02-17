"use client";

import * as S from "@/Imports/signupImports/signupImports";

const loginSchema = S.z.object({
  identifier: S.z
    .string()
    .min(1, "لطفا ایمیل یا شماره موبایل را وارد کنید")
    .refine((val) => val.includes("@") || /^[0]?[0-9]{10,11}$/.test(val), {
      message: "ایمیل یا شماره موبایل معتبر وارد کنید",
    }),
});

type LoginFormData = S.z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = S.useRouter();
  const [mounted, setMounted] = S.useState(false);
  const [isSubmitting, setIsSubmitting] = S.useState(false);
  const timerRef = S.useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = S.useForm<LoginFormData>({
    resolver: S.zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  S.useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onSubmit: S.SubmitHandler<LoginFormData> = async (data) => {
    const identifier = data.identifier.trim();
    setIsSubmitting(true);

    try {
      const isEmail = identifier.includes("@");
      let formattedIdentifier = identifier;

      if (!isEmail && formattedIdentifier.startsWith("0")) {
        formattedIdentifier = "+98" + formattedIdentifier.slice(1);
      }

      // فعلاً فقط ایمیل پشتیبانی میشه
      if (!isEmail) {
        S.toast.error("در حال حاضر فقط ورود با ایمیل امکان‌پذیر است");
        setIsSubmitting(false);
        return;
      }

      // ثبت‌نام خودکار
      const { data: signUpData, error: signUpError } =
        await S.supabase.auth.signUp({
          email: formattedIdentifier,
          password: formattedIdentifier + "_auto_pass_2024",
        });

      if (signUpError && signUpError.message !== "User already registered") {
        throw signUpError;
      }

      // اگه کاربر قبلاً ثبت‌نام کرده بود لاگین کن
      if (
        signUpError?.message === "User already registered" ||
        signUpData?.user?.identities?.length === 0
      ) {
        const { error: signInError } = await S.supabase.auth.signInWithPassword(
          {
            email: formattedIdentifier,
            password: formattedIdentifier + "_auto_pass_2024",
          },
        );
        if (signInError) throw signInError;
      }

      // آپدیت پروفایل بعد از لاگین
      const { data: userData } = await S.supabase.auth.getUser();
      if (userData?.user) {
        await S.supabase
          .from("profiles")
          .update({ email: formattedIdentifier })
          .eq("id", userData.user.id);
      }

      S.toast.success("ورود موفقیت‌آمیز!");
      reset();

      timerRef.current = setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: any) {
      console.error(err);
      S.toast.error(err.message || "خطای غیرمنتظره");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2] font-[tahoma]">
      <div className="w-[95%] max-w-[450px] bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
        <S.Image
          src="/logo1.svg"
          alt="logo"
          width={100}
          height={100}
          priority
        />

        <h1 className="text-2xl font-bold mt-3 mb-2 text-[#414141]">
          ورود / ثبت‌ نام
        </h1>

        <p className="text-sm text-[#757575] mb-6 text-center">
          لطفا شماره موبایل یا ایمیل خود را وارد کنید
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <input
            type="text"
            {...register("identifier")}
            placeholder="ایمیل یا شماره موبایل"
            disabled={isSubmitting}
            dir="rtl"
            className="w-full px-4 py-4 rounded-xl border border-gray-300 bg-white focus:outline-none text-black focus:ring-2 focus:ring-[#347469] text-right placeholder:text-gray-400"
          />

          {errors.identifier && (
            <p className="text-red-500 text-sm text-right">
              {errors.identifier.message}
            </p>
          )}

          <p className="text-sm text-[#1F7168] text-right">
            لطفا این قسمت را خالی نگذارید
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-bold transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#347469] hover:bg-[#2a5d54]"
            }`}
          >
            {isSubmitting ? "در حال ورود..." : "ورود / ثبت‌ نام"}
          </button>
        </form>

        <p className="text-[10px] text-gray-500 mt-6 text-center leading-6">
          ورود شما به معنای پذیرش{" "}
          <span className="text-[#347469] border-b border-[#347469] cursor-pointer">
            شرایط و قوانین
          </span>{" "}
          و{" "}
          <span className="text-[#347469] border-b border-[#347469] cursor-pointer">
            حریم خصوصی
          </span>{" "}
          است
        </p>
      </div>

      <S.ToastContainer position="top-right" autoClose={2000} rtl />
    </div>
  );
}
