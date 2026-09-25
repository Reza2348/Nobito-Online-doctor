"use client";

import type { FeedbackOptionsProps } from "@/Types/types";

export default function FeedbackOptions({
  options,
  selectedOptions,
  sentiment,
  onToggle,
}: FeedbackOptionsProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-bold text-gray-700">
        موارد مورد نظر
      </label>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = selectedOptions.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={selected}
              className={`rounded-xl border px-4 py-3 text-right text-sm transition ${
                selected
                  ? sentiment === "positive"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {selected ? "✓ " : ""}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
