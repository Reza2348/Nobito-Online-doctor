"use client";

import { MdBusiness, MdClose, MdDelete, MdWarning } from "react-icons/md";

interface DeleteClinicModalProps {
  open: boolean;
  deleting: boolean;
  name?: string | null;
  specialty?: string | null;
  photoUrl?: string | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteClinicModal({
  open,
  deleting,
  name,
  specialty,
  photoUrl,
  onClose,
  onConfirm,
}: DeleteClinicModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="
        fixed
        inset-0
        z-9999
        flex
        items-center
        justify-center
        bg-slate-950/60
        p-4
        backdrop-blur-md
      "
      onClick={() => {
        if (!deleting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-clinic-title"
        className="
          w-full
          max-w-107.5
          overflow-hidden
          rounded-[28px]
          border
          border-white/70
          bg-white
          shadow-[0_30px_80px_rgba(15,23,42,0.25)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            relative
            p-7
            pb-5
          "
        >
          <button
            type="button"
            aria-label="بستن"
            disabled={deleting}
            onClick={onClose}
            className="
              absolute
              left-5
              top-5
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
          >
            <MdClose size={20} />
          </button>

          <div
            className="
              flex
              items-start
              gap-4
            "
          >
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

            <div
              className="
                min-w-0
                pt-1
              "
            >
              <h3
                id="delete-clinic-title"
                className="
                  text-lg
                  font-black
                  text-slate-800
                "
              >
                حذف کلینیک
              </h3>

              <p
                className="
                  mt-1.5
                  text-xs
                  leading-6
                  text-slate-500
                "
              >
                این عملیات دائمی است و اطلاعات کلینیک حذف خواهد شد.
              </p>
            </div>
          </div>

          {/* Clinic Preview */}
          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                bg-white
                shadow-sm
              "
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <MdBusiness size={23} className="text-blue-500" />
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-extrabold
                  text-slate-800
                "
              >
                {name || "کلینیک بدون نام"}
              </p>

              {specialty && (
                <p
                  className="
                    mt-0.5
                    truncate
                    text-[11px]
                    text-slate-400
                  "
                >
                  {specialty}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            flex
            gap-3
            border-t
            border-slate-100
            bg-slate-50/80
            p-5
          "
        >
          <button
            type="button"
            disabled={deleting}
            onClick={onClose}
            className="
              flex-1
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              font-bold
              text-slate-600
              transition-all
              duration-200
              hover:border-slate-300
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            انصراف
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-red-600
              px-4
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-red-200
              transition-all
              duration-200
              hover:bg-red-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <MdDelete size={18} />

            <span>{deleting ? "در حال حذف..." : "حذف"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
