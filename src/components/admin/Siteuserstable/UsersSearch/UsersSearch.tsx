"use client";

import { MdSearch } from "react-icons/md";

type UsersSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function UsersSearch({ value, onChange }: UsersSearchProps) {
  return (
    <div className="relative mb-6 max-w-sm">
      <MdSearch size={20} className="absolute right-4 top-3.5 text-gray-400" />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="جستجوی نام یا ایمیل..."
        className="
          w-full
          rounded-2xl
          border border-gray-200
          bg-gray-50
          py-2.5
          pr-11
          pl-4
          text-sm
          text-gray-800
          outline-none
          transition
          focus:border-teal-500
          focus:ring-4
          focus:ring-teal-500/10
        "
      />
    </div>
  );
}
