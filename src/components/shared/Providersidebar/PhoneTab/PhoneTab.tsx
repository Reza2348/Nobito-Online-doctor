import { FiPhoneCall } from "react-icons/fi";

interface PhoneTabProps {
  secretaryPhone: string;
}

export default function PhoneTab({ secretaryPhone }: PhoneTabProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
      <p className="text-[11px] font-bold text-slate-400">
        شماره تماس منشی مطب
      </p>
      <a
        href={`tel:${secretaryPhone}`}
        dir="ltr"
        className="mt-3 flex items-center justify-between rounded-xl border border-sky-100 bg-white px-4 py-3 transition-colors hover:border-sky-300"
      >
        <span className="text-base font-black tracking-wider text-slate-800">
          {secretaryPhone}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
          <FiPhoneCall size={16} />
        </span>
      </a>

      <p className="mt-3 text-[11px] leading-6 text-slate-400">
        برای هماهنگی نوبت تلفنی با منشی مطب تماس بگیرید.
      </p>
    </div>
  );
}
