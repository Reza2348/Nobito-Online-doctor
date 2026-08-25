"use client";

import { FaUser } from "react-icons/fa";

import PasswordInput from "@/components/AdminLogin/PasswordInput/PasswordInput";

type Props = {
  username: string;
  password: string;
  showPassword: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
};

export default function LoginForm({
  username,
  password,
  showPassword,
  onUsernameChange,
  onPasswordChange,
  onTogglePassword,
}: Props) {
  return (
    <div>
      <div className="relative mb-4">
        <FaUser className="absolute right-4 top-3.5 text-gray-400" />

        <input
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="نام کاربری"
          className="w-full rounded-2xl border bg-gray-50 py-3 pr-12 text-black outline-none focus:border-teal-500"
        />
      </div>

      <PasswordInput
        password={password}
        showPassword={showPassword}
        onChange={onPasswordChange}
        onToggle={onTogglePassword}
      />
    </div>
  );
}
