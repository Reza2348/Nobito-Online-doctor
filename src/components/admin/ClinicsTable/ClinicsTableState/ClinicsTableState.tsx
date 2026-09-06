import { MdLocalHospital, MdRefresh } from "react-icons/md";

interface LoadingProps {
  type: "loading";
}

interface ErrorProps {
  type: "error";
  message: string;
  onRetry: () => void;
}

interface EmptyProps {
  type: "empty";
}

type Props = LoadingProps | ErrorProps | EmptyProps;

export default function ClinicsTableState(props: Props) {
  if (props.type === "loading") {
    return (
      <div
        dir="rtl"
        className="rounded-3xl border bg-white p-10 text-center shadow-lg"
      >
        <MdLocalHospital size={45} className="mx-auto mb-4 text-blue-300" />

        <p className="text-gray-500">در حال دریافت کلینیک‌ها...</p>
      </div>
    );
  }

  if (props.type === "error") {
    return (
      <div dir="rtl" className="rounded-3xl border bg-white p-6 shadow-lg">
        <div
          className="
            rounded-2xl border
            border-red-200
            bg-red-50 p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">
            <MdLocalHospital size={28} className="text-red-500" />

            <p className="font-bold text-red-700">خطا در دریافت کلینیک‌ها</p>
          </div>

          <p
            dir="ltr"
            className="
              wrap-break-word
              text-right text-sm
              text-red-600
            "
          >
            {props.message}
          </p>

          <button
            type="button"
            onClick={props.onRetry}
            className="
              mt-5 flex items-center gap-2
              rounded-xl bg-blue-600
              px-5 py-2.5 text-white
              transition
              hover:bg-blue-700
            "
          >
            <MdRefresh size={20} />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl border
        border-dashed border-gray-200
        bg-gray-50 py-14 text-center
      "
    >
      <MdLocalHospital size={48} className="mx-auto mb-4 text-gray-300" />

      <p className="font-bold text-gray-600">هنوز کلینیکی ثبت نشده است.</p>

      <p className="mt-2 text-sm text-gray-400">
        کلینیک‌های ثبت‌شده در جدول clinics اینجا نمایش داده می‌شوند.
      </p>
    </div>
  );
}
