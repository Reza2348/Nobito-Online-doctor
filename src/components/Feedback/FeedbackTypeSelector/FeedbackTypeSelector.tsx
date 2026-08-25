"use client";

import type {
  FeedbackSentiment,
  FeedbackTypeSelectorProps,
} from "@/Types/types";

export default function FeedbackTypeSelector({
  value,
  onChange,
}: FeedbackTypeSelectorProps) {
  const handleChange = (nextValue: FeedbackSentiment) => {
    onChange(nextValue);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-bold text-gray-700">
        نوع بازخورد
      </label>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleChange("positive")}
          aria-pressed={value === "positive"}
          className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
            value === "positive"
              ? "border-green-600 bg-green-50 text-green-700"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          👍 نقاط مثبت
        </button>

        <button
          type="button"
          onClick={() => handleChange("negative")}
          aria-pressed={value === "negative"}
          className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
            value === "negative"
              ? "border-red-500 bg-red-50 text-red-600"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          👎 نقاط منفی
        </button>
      </div>
    </div>
  );
}
