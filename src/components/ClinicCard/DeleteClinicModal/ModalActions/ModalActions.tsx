import { MdDelete } from "react-icons/md";

interface Props {
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function ModalActions({ deleting, onClose, onConfirm }: Props) {
  return (
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
  );
}
