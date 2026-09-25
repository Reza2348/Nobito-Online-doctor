import { MdDelete } from "react-icons/md";

interface Props {
  saving: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export default function ModalActions({ saving, onClose, onConfirm }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 p-6">
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
  );
}
