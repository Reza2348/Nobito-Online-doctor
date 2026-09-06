import {
  MdArrowBackIosNew,
  MdClose,
  MdDelete,
  MdMedicalServices,
  MdWarning,
} from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

interface Props {
  open: boolean;
  doctor: AdminDoctor;
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteDoctorModal({
  open,
  doctor,
  saving,
  onClose,
  onConfirm,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="
        fixed inset-0
        z-100
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-md
      "
      onClick={() => !saving && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-doctor-title"
        onClick={(event) => event.stopPropagation()}
        className="
          relative
          w-full
          max-w-107.5
          overflow-hidden
          rounded-4xl
          border
          border-white
          bg-white
          shadow-[0_35px_100px_rgba(15,23,42,0.25)]
        "
      >
        {/* Top accent */}
        <div
          className="
            h-1.5
            w-full
            bg-linear-to-l
            from-red-600
            via-rose-500
            to-orange-400
          "
        />

        {/* Close */}
        <button
          type="button"
          aria-label="بستن"
          disabled={saving}
          onClick={onClose}
          className="
            absolute
            left-5
            top-5
            flex h-9 w-9
            items-center justify-center
            rounded-xl
            bg-slate-100
            text-slate-400
            transition
            hover:bg-slate-200
            hover:text-slate-700
            disabled:opacity-50
          "
        >
          <MdClose size={19} />
        </button>

        {/* Header */}
        <div
          className="
            bg-linear-to-br
            from-red-50
            via-white
            to-orange-50
            px-7
            pb-7
            pt-9
          "
        >
          <div className="flex justify-center">
            <div
              className="
                relative
                flex h-19.5 w-19.5
                items-center justify-center
                rounded-[26px]
                bg-red-100
                text-red-600
              "
            >
              <span
                className="
                  absolute
                  -inset-2
                  rounded-[30px]
                  border
                  border-red-100
                "
              />

              <MdWarning size={35} />
            </div>
          </div>

          <div className="mt-5 text-center">
            <h3
              id="delete-doctor-title"
              className="
                text-xl
                font-black
                text-slate-900
              "
            >
              حذف پزشک
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              اطلاعات این پزشک از پنل مدیریت حذف خواهد شد.
            </p>
          </div>
        </div>

        {/* Doctor Preview */}
        <div className="px-6 pt-5">
          <div
            className="
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
                h-12
                w-12
                shrink-0
                overflow-hidden
                rounded-xl
                bg-white
                ring-1
                ring-slate-200
              "
            >
              {doctor.photo_url ? (
                <img
                  src={doctor.photo_url}
                  alt={doctor.name || "پزشک"}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    text-slate-400
                  "
                >
                  <MdMedicalServices size={22} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-black
                  text-slate-800
                "
              >
                {doctor.name || "پزشک انتخاب‌شده"}
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-xs
                  text-slate-400
                "
              >
                {doctor.specialty || "تخصص ثبت نشده"}
              </p>
            </div>

            <MdArrowBackIosNew
              size={15}
              className="
                mr-auto
                rotate-180
                text-slate-300
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            p-6
          "
        >
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="
              h-12
              rounded-2xl
              border
              border-slate-200
              bg-white
              text-sm
              font-bold
              text-slate-700
              transition
              hover:bg-slate-50
              focus:outline-none
              focus:ring-4
              focus:ring-slate-100
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
              inline-flex
              h-12
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-red-600
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-red-600/20
              transition
              hover:bg-red-700
              focus:outline-none
              focus:ring-4
              focus:ring-red-100
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {saving ? (
              <>
                <span
                  className="
                    h-4 w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-red-200
                    border-t-white
                  "
                />
                در حال حذف...
              </>
            ) : (
              <>
                <MdDelete size={18} />
                حذف پزشک
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
