import { MdSave } from "react-icons/md";

interface EntityFormActionsProps {
  saving: boolean;
  onClose: () => void;
}

export default function EntityFormActions({
  saving,
  onClose,
}: EntityFormActionsProps) {
  return (
    <div
      className="
     mt-7
     flex items-center justify-end
     gap-3
     border-t border-gray-100
     pt-5
   "
    >
      {" "}
      <button
        type="button"
        onClick={onClose}
        disabled={saving}
        className="
       rounded-xl
       bg-gray-100
       px-5 py-2.5
       text-sm
       font-semibold
       text-gray-700
       transition
       hover:bg-gray-200
       disabled:cursor-not-allowed
       disabled:opacity-50
     "
      >
        انصراف{" "}
      </button>
      <button
        type="submit"
        disabled={saving}
        className="
      flex items-center
      gap-2
      rounded-xl
      bg-blue-600
      px-5 py-2.5
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-blue-700
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
      >
        <MdSave size={19} />

        {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}
