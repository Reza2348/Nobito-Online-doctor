"use client";

import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  password: string;
  showPassword: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
};

export default function PasswordInput({
  password,
  showPassword,
  onChange,
  onToggle,
}: Props) {
  return (
    <div className="relative mb-6">
      <FaLock className="absolute right-4 top-3.5 text-gray-400" />

      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => onChange(e.target.value)}
        placeholder="رمز عبور"
        autoComplete="current-password"
        className="w-full rounded-2xl border bg-gray-50 py-3 pr-12 pl-12 text-black outline-none focus:border-teal-500"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute left-4 top-3.5 text-gray-400"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
