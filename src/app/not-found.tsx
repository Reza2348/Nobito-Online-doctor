import Link from "next/link";
import { FiHome, FiSearch, FiHeart } from "react-icons/fi";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-4 bg-surface relative overflow-hidden"
    >

      <div className="relative max-w-xl w-full text-center bg-white/80 border border-white shadow-sm rounded-xl p-8 md:p-12">
        <div className="mx-auto w-20 h-20 rounded-xl bg-emerald-100 flex items-center justify-center">
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
            className="flex items-center justify-center gap-2 rounded-xl bg-brand text-white px-7 py-4 font-bold transition hover:shadow-sm"
          >
            <FiHome />
            بازگشت به خانه
          </Link>

          <Link
            href="/search"
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 text-gray-800 px-7 py-4 font-bold transition hover:bg-gray-200"
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
