import { MdClose, MdWarning } from "react-icons/md";

interface DeleteConsultantModalProps {
  open: boolean;
  consultantName?: string | null;
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteConsultantModal({
  open,
  consultantName,
  saving,
  onClose,
  onConfirm,
}: DeleteConsultantModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="
        fixed
        inset-0
       z-100
        flex
        items-center
        justify-center
        bg-slate-950/60
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/20
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            px-6
            py-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-500
              "
            >
              <MdWarning size={25} />
            </div>

            <div>
              <h3
                className="
                  text-lg
                  font-extrabold
                  text-slate-900
                "
              >
                حذف مشاور
              </h3>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-400
                "
              >
                این عملیات قابل بازگشت نیست
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label="بستن"
          >
            <MdClose size={21} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div
            className="
              rounded-2xl
              bg-red-50
              p-4
            "
          >
            <p
              className="
                text-sm
                leading-7
                text-slate-700
              "
            >
              اطلاعات مشاور
              <span
                className="
                  mx-1
                  font-extrabold
                  text-slate-900
                "
              >
                «{consultantName || "بدون نام"}»
              </span>
              از سامانه حذف خواهد شد.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            flex
            gap-3
            border-t
            border-slate-100
            bg-slate-50
            px-6
            py-4
          "
        >
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="
              flex-1
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              font-bold
              text-slate-600
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            انصراف
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={onConfirm}
            className="
              flex-1
              rounded-2xl
              bg-red-600
              px-4
              py-3
              font-bold
              text-white
              shadow-lg
              shadow-red-200
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
