"use client";

import { MdClose } from "react-icons/md";

import ModalHeader from "./ModalHeader/ModalHeader";
import ClinicPreview from "./ClinicPreview/ClinicPreview";
import ModalActions from "./ModalActions/ModalActions";

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
        <div className="relative p-7 pb-5">
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

          <ModalHeader />
          <ClinicPreview
            name={name}
            specialty={specialty}
            photoUrl={photoUrl}
          />
        </div>

        <ModalActions
          deleting={deleting}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </div>
    </div>
  );
}
