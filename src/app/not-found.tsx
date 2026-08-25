import Link from "next/link";
import { FiHome, FiSearch, FiHeart } from "react-icons/fi";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-emerald-200/40 blur-3xl rounded-full" />

      <div className="relative max-w-xl w-full text-center bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[40px] p-8 md:p-12">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-100 flex items-center justify-center">
          <FiSearch className="text-4xl text-emerald-600" />
        </div>

        <h1 className="mt-8 text-7xl md:text-8xl font-black text-gray-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-black text-gray-900">
          صفحه پیدا نشد
        </h2>

        <p className="mt-4 text-gray-600 leading-8">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده باشد.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#1F7168] text-white px-7 py-4 font-bold transition hover:-translate-y-1 hover:shadow-xl"
          >
            <FiHome />
            بازگشت به خانه
          </Link>

          <Link
            href="/search"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gray-100 text-gray-800 px-7 py-4 font-bold transition hover:bg-gray-200"
          >
            <FiSearch />
            جستجو
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
          <FiHeart className="text-red-400" />
          همراه شما در مسیر سلامت
        </div>
      </div>
    </main>
  );
}
