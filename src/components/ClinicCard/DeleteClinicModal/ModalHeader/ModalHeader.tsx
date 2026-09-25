import { MdWarning } from "react-icons/md";

export default function ModalHeader() {
  return (
    <div className="flex items-start gap-4">
      <div
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-red-100
          bg-red-50
          text-red-500
          shadow-sm
        "
      >
        <MdWarning size={30} />
      </div>

      <div className="min-w-0 pt-1">
        <h3
          id="delete-clinic-title"
          className="text-lg font-black text-slate-800"
        >
          حذف کلینیک
        </h3>

        <p className="mt-1.5 text-xs leading-6 text-slate-500">
          این عملیات دائمی است و اطلاعات کلینیک حذف خواهد شد.
        </p>
      </div>
    </div>
  );
}
