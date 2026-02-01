"use client";

import * as S from "@/Imports/signupImports/signupImports";

export default function SignUpPage(): JSX.Element {
  const router = S.useRouter();
  const [showPassword, setShowPassword] = S.useState<boolean>(false);
  const timerRef = S.useRef<NodeJS.Timeout | null>(null);
  const { t, ready } = S.useTranslation();
  const [mounted, setMounted] = S.useState<boolean>(false);

  S.useEffect(() => {
    setMounted(true);
  }, []);

  const getSignUpSchema = (t: S.TFunction) =>
    S.z.object({
      firstName: S.z.string().min(1, t("first_name_required")),
      lastName: S.z.string().min(1, t("last_name_required")),
      email: S.z.string().email(t("invalid_email")),
      password: S.z.string().min(6, t("password_min_length")),
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = S.useForm<S.SignUpFormData>({
    resolver: mounted ? S.zodResolver(getSignUpSchema(t)) : undefined,
  });

  const onSubmit: S.SubmitHandler<S.SignUpFormData> = async (data) => {
    try {
      const { firstName, lastName, email, password } = data;

      const { data: signUpData, error: authError } =
        await S.supabase.auth.signUp({
          email,
          password,
          options: { data: { first_name: firstName, last_name: lastName } },
        });

      if (authError) throw authError;
      const user = signUpData.user;
      if (!user) throw new Error(t("signup_failed"));

      const { error: profileError } = await S.supabase.from("profiles").insert([
        {
          user_id: user.id,
          email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);

      if (profileError) throw new Error(t("profile_creation_failed"));

      S.toast.success(t("registration_success"));
      timerRef.current = setTimeout(() => router.push("/"), 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : t("unknown_error");
      S.toast.error(errorMessage);
    }
  };

  S.useEffect(() => {
    return () => {
      if (timerRef.current) S.clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted || !ready) return null;

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-sm w-full bg-white dark:bg-gray-900 px-8">
        <h1 className="text-xl font-normal text-center mb-6 dark:text-white">
          {t("create_account")}
        </h1>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 tracking-wider">
            FUND FOR FOUND
          </h2>
          <div className="flex justify-center items-center h-20">
            <S.Image
              src="/Vector.svg"
              alt="logo"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">{t("or")}</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1 dark:text-white"
            >
              {t("first_name")}
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              placeholder={t("enter_first_name")}
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md dark:text-white"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1 dark:text-white"
            >
              {t("last_name")}
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              placeholder={t("enter_last_name")}
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md dark:text-white"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 dark:text-white"
            >
              {t("emailAddress")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("emailAddress")}
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md dark:text-white"
            />
            <p className="text-[#644FC1] text-xs mt-1">{t("email_note")}</p>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 dark:text-white"
            >
              {t("password")}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder={t("passwordPlaceholder")}
              defaultValue=""
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md pr-10 dark:text-white"
            />
            {showPassword ? (
              <S.FaEyeSlash
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <S.FaEye
                className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(true)}
              />
            )}
            <S.Link
              href="/auth/Forgotpassword"
              className="text-xs text-purple-700 hover:underline mt-2 inline-block"
            >
              {t("forgotPassword")}
            </S.Link>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {t(errors.password.message || "")}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {isSubmitting ? t("signing_up") : t("continue")}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm dark:text-white">
          {t("already_have_account")}
          <span className="mr-1">
            <S.Link
              href="/auth/login"
              className="text-purple-700 ml-1 hover:underline font-medium"
            >
              {t("login")}
            </S.Link>
          </span>
        </p>
      </div>

      <S.ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
