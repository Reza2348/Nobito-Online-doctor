"use client";

import * as L from "@/Imports/LoginImports/LoginImports";

const ToastContainer = L.dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false },
);

const loginSchema = L.z.object({
  identifier: L.z.string().min(1, "emailRequired").email("invalidEmail"),
  password: L.z.string().min(6, "passwordMinLength"),
});

type LoginFormData = L.z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = L.useRouter();
  const [showPassword, setShowPassword] = L.useState(false);
  const [mounted, setMounted] = L.useState(false);
  const timerRef = L.useRef<NodeJS.Timeout | null>(null);

  L.useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = L.useForm<LoginFormData>({
    resolver: L.zodResolver(loginSchema),
  });

  const onSubmit: L.SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { identifier, password } = data;

      const { data: loginData, error } =
        await L.supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });

      if (error) throw error;
      if (!loginData?.user) throw new Error("userNotFound");

      L.toast.success("loginSuccess");

      timerRef.current = setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "unexpectedError";
      L.toast.error(errorMessage);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="max-w-xs w-full">
        <div className="flex justify-center items-center h-20 mb-8">
          <L.Image
            src="/Vector.svg"
            alt="logo"
            width={50}
            height={50}
            priority
          />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-800">
          {"appTitle"}
        </h1>
        <p className="text-center text-gray-600 mb-8 dark:text-white">
          {"createAccountOrSignIn"}
        </p>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">{"or"}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
            >
              {"emailAddress"}
            </label>
            <input
              id="identifier"
              type="text"
              {...register("identifier")}
              placeholder={"emailPlaceholder"}
              defaultValue=""
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:text-white"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.identifier.message || ""}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-white"
            >
              {"password"}
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder={"passwordPlaceholder"}
              defaultValue=""
              className="w-full border border-[#8D75F7] px-3 py-2 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10 dark:text-white"
            />

            {mounted &&
              (showPassword ? (
                <L.FaEyeSlash
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <L.FaEye
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(true)}
                />
              ))}

            <L.Link
              href="/auth/Forgotpassword"
              className="text-xs text-purple-700 hover:underline mt-2 inline-block"
            >
              {"forgotPassword"}
            </L.Link>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message || ""}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-md text-white font-medium transition-colors ${
              isSubmitting
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {isSubmitting ? "loggingIn" : "continue"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm dark:text-white">
          {"dontHaveAccount"}
          <span className="mr-1">
            <L.Link
              href="/auth/signup"
              className="text-purple-700 ml-1 font-medium hover:underline"
            >
              {"createAccount"}
            </L.Link>
          </span>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
