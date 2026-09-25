import type { OnlineConsultationProps } from "@/Types/types";

interface ConsultationHeaderProps {
  doctorsOnline: NonNullable<OnlineConsultationProps["doctorsOnline"]>;
}

const ConsultationHeader = ({ doctorsOnline }: ConsultationHeaderProps) => {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        {doctorsOnline.toLocaleString("fa-IR")} پزشک آنلاین
      </div>

      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        هر زمان که به پزشک نیاز دارید،
        <span className="block text-cyan-600">ما اینجا هستیم</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
        بدون نیاز به مراجعه حضوری، با پزشک متخصص موردنظر خود به‌صورت آنلاین
        مشورت کنید و پاسخ سؤالات پزشکی خود را دریافت کنید.
      </p>
    </div>
  );
};

export default ConsultationHeader;
