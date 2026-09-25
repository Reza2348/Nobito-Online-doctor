"use client";

import { useRouter } from "next/navigation";

export default function ContentHeader() {
  const router = useRouter();

  const handleLogout = (): void => {
    router.push("/Admin");
  };

  return (
    <section className="rounded-3xl border border-white bg-white/80 p-8 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            پنل مدیریت محتوا
          </h1>

          <p className="mt-3 text-gray-500">
            مدیریت هوشمند اخبار، مقالات و محتوای Nobito
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Content */}
          <button
            type="button"
            className="
              rounded-2xl
              bg-blue-600
              px-5
              py-3
              font-bold
              text-white
              shadow-lg
              transition
              hover:bg-blue-700
            "
          >
            content
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="
              rounded-2xl
              bg-red-600
              px-5
              py-3
              font-bold
              text-white
              shadow-lg
              transition
              hover:bg-red-700
            "
          >
            خروج
          </button>
        </div>
      </div>
    </section>
  );
}
