import { MdDelete, MdEdit } from "react-icons/md";

import type { AdminConsultant } from "@/Types/types";

interface ConsultantActionsProps {
  consultant: AdminConsultant;
  saving: boolean;
  onEdit: (consultant: AdminConsultant) => void;
  onDeleteClick: () => void;
}

export default function ConsultantActions({
  consultant,
  saving,
  onEdit,
  onDeleteClick,
}: ConsultantActionsProps) {
  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-2
        xl:flex-col
      "
    >
      {/* ویرایش */}
      <button
        type="button"
        title="ویرایش مشاور"
        disabled={saving}
        onClick={() => onEdit(consultant)}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-blue-50
          px-4
          py-3
          font-bold
          text-blue-600
          transition-all
          hover:bg-blue-600
          hover:text-white
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdEdit size={20} />

        <span>ویرایش</span>
      </button>

      {/* حذف */}
      <button
        type="button"
        title="حذف مشاور"
        disabled={saving}
        onClick={onDeleteClick}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-red-50
          px-4
          py-3
          font-bold
          text-red-600
          transition-all
          hover:bg-red-600
          hover:text-white
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdDelete size={20} />

        <span>{saving ? "در حال حذف..." : "حذف"}</span>
      </button>
    </div>
  );
}
