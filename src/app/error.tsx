"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold mb-2">خطایی رخ داد</h2>
      <button onClick={() => reset()} className="text-[#1F7168] underline">
        تلاش مجدد
      </button>
    </div>
  );
}
