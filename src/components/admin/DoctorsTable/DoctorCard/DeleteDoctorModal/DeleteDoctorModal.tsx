import { MdClose } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

import ModalHeader from "./ModalHeader/ModalHeader";
import DoctorPreview from "./DoctorPreview/DoctorPreview";
import ModalActions from "./ModalActions/ModalActions";

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

        <ModalHeader />
        <DoctorPreview doctor={doctor} />
        <ModalActions saving={saving} onClose={onClose} onConfirm={onConfirm} />
      </div>
    </div>
  );
}
