import { FiHeart } from "react-icons/fi";

const CharityHeader = () => {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
        <FiHeart className="fill-emerald-500" />
        همراه سلامت
      </div>

      <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
        همه کمپین‌های
        <span className="text-emerald-600"> حمایت درمانی</span>
      </h1>

      <p className="mt-5 leading-8 text-slate-500">
        با حمایت شما، بیماران نیازمند می‌توانند به درمان، دارو و خدمات پزشکی
        مورد نیاز خود دسترسی داشته باشند.
      </p>
    </header>
  );
};

export default CharityHeader;
