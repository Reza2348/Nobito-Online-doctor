"use client";

import type { FeedbackCommentProps } from "@/Types/types";

export default function FeedbackComment({
  value,
  onChange,
  maxLength = 1000,
}: FeedbackCommentProps) {
  return (
    <div>
      <label
        htmlFor="feedback-comment"
        className="mb-3 block text-sm font-bold text-gray-700"
      >
        توضیحات
      </label>

      <textarea
        id="feedback-comment"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        maxLength={maxLength}
        placeholder="نظر یا تجربه خود را بنویسید..."
        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#347469] focus:bg-white"
      />

      <div className="mt-2 text-left text-xs text-gray-400">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
