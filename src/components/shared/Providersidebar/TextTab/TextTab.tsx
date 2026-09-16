"use client";

import { useRouter } from "next/navigation";
import { FiMessageCircle } from "react-icons/fi";

interface TextTabProps {
  chatHref: string;
}

export default function TextTab({ chatHref }: TextTabProps) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
        <FiMessageCircle size={20} />
      </div>

      <p className="mt-3 text-sm font-bold text-slate-800">
        گفتگوی متنی با پزشک
      </p>

      <p className="mt-1 text-[11px] leading-6 text-slate-400">
        سوال خود را مستقیم برای پزشک بنویسید و پاسخ را در چت دریافت کنید.
      </p>

      <button
        type="button"
        onClick={() => router.push(chatHref)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-sky-700"
      >
        <FiMessageCircle size={15} />
        شروع گفتگو
      </button>
    </div>
  );
}
