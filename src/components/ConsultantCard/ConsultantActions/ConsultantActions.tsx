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
        w-full
        shrink-0
        items-center
        gap-2
        xl:w-auto
        xl:flex-col
        xl:flex-nowrap
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
          flex-1
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-blue-50
          px-3
          py-2.5
          text-sm
          font-bold
          text-blue-600
          transition-all
          hover:bg-blue-600
          hover:text-white
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:px-4
          sm:py-3
          sm:text-base
          xl:flex-none
          xl:w-full
        "
      >
        <MdEdit size={18} className="shrink-0" />
        <span className="whitespace-nowrap">ویرایش</span>
      </button>

      {/* حذف */}
      <button
        type="button"
        title="حذف مشاور"
        disabled={saving}
        onClick={onDeleteClick}
        className="
          inline-flex
          flex-1
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-red-50
          px-3
          py-2.5
          text-sm
          font-bold
          text-red-600
          transition-all
          hover:bg-red-600
          hover:text-white
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:px-4
          sm:py-3
          sm:text-base
          xl:flex-none
          xl:w-full
        "
      >
        <MdDelete size={18} className="shrink-0" />
        <span className="whitespace-nowrap">
          {saving ? "در حال حذف..." : "حذف"}
        </span>
      </button>
    </div>
  );
}
