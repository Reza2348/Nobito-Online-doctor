"use client";

import LoginHeader from "@/components/AdminLogin/LoginHeader/LoginHeader";
import RoleSelector from "@/components/AdminLogin/RoleSelector/RoleSelector";
import LoginForm from "@/components/AdminLogin/LoginForm/LoginForm";
import ErrorAlert from "@/components/AdminLogin/ErrorAlert/ErrorAlert";
import Footer from "@/components/AdminLogin/Footer/Footer";
import { useLogin } from "@/hooks/useLogin";

export default function LoginCard() {
  const {
    role,
    username,
    password,
    showPassword,
    rememberMe,
    loading,
    error,
    setRole,
    setUsername,
    setPassword,
    setShowPassword,
    setRememberMe,
    handleLogin,
  } = useLogin();

  return (
    <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      {/* Header */}
      <LoginHeader />

      {/* Role Selector */}
      <RoleSelector role={role} onChange={setRole} />

      {/* Error */}
      <ErrorAlert message={error} />

      {/* Login Form */}
      <LoginForm
        username={username}
        password={password}
        showPassword={showPassword}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
      />

      {/* Remember Me */}
      <div className="mb-4 flex items-center">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />

          <span>مرا به خاطر بسپار</span>
        </label>
      </div>

      {/* Login Button */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="mt-2 w-full rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading ? "در حال ورود..." : "ورود به پنل"}
      </button>

      {/* Footer */}
      <Footer />
    </section>
  );
}
