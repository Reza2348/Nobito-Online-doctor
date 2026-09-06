import { MdPsychology, MdRefresh } from "react-icons/md";

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

export default function ConsultantsTableState(props: Props) {
  if (props.type === "loading") {
    return (
      <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <MdPsychology size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

            <p className="mt-1 text-sm text-gray-500">
              مشاوران ثبت‌شده در سامانه
            </p>
          </div>
        </div>

        <div className="py-10 text-center text-gray-500">
          در حال دریافت مشاوران...
        </div>
      </div>
    );
  }

  if (props.type === "error") {
    return (
      <div dir="rtl" className="rounded-3xl bg-white p-6 shadow">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <MdPsychology size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">لیست مشاوران</h2>

            <p className="mt-1 text-sm text-gray-500">مدیریت مشاوران</p>
          </div>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="mb-2 font-bold text-red-700">خطا در دریافت مشاوران</p>

          <p className="wrap-break-word text-red-600">{props.message}</p>

          <button
            type="button"
            onClick={props.onRetry}
            className="mt-4 flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700"
          >
            <MdRefresh size={20} />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center">
      <MdPsychology size={46} className="mx-auto mb-3 text-gray-300" />

      <p className="font-semibold text-gray-600">هنوز مشاوری ثبت نشده است.</p>

      <p className="mt-1 text-sm text-gray-400">مشاوران ثبت‌شده در سامانه</p>
    </div>
  );
}
