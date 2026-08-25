"use client";

import type { FeedbackRatingProps } from "@/Types/types";

export default function FeedbackRating({
  rating,
  onChange,
}: FeedbackRatingProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-bold text-gray-700">
        امتیاز شما
      </label>

      <div
        className="flex items-center gap-2"
        role="radiogroup"
        aria-label="امتیاز"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`امتیاز ${star} از 5`}
            onClick={() => onChange(star)}
            className={`text-3xl transition hover:scale-110 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
