"use client";

import { useState } from "react";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim() || rating === 0) {
      return;
    }

    setSubmitted(true);
    setMessage("");
    setRating(0);
  };

  return (
    <div dir="rtl" className="min-h-screen  p-6">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">ارسال بازخورد</h1>

          <p className="mt-2 text-sm text-gray-500">
            نظر شما به ما کمک می‌کند خدمات بهتری ارائه دهیم.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-xl bg-green-50 p-4 text-center text-green-700">
              بازخورد شما با موفقیت ثبت شد. ممنون از نظر شما 🌷
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Rating */}
              <div>
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  میزان رضایت شما
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRating(item)}
                      className={`text-3xl transition ${
                        item <= rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="feedback"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  نظر شما
                </label>

                <textarea
                  id="feedback"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="نظر یا پیشنهاد خود را بنویسید..."
                  rows={5}
                  className="w-full resize-none rounded-xl border text-black border-gray-200 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!message.trim() || rating === 0}
                className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                ارسال بازخورد
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
