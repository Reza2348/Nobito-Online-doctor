import { MdDelete, MdEdit } from "react-icons/md";

import type { AdminClinic } from "@/Types/types";

interface ClinicActionsProps {
  clinic: AdminClinic;
  disabled: boolean;
  saving: boolean;
  deleting: boolean;
  onEdit: (clinic: AdminClinic) => void;
  onDeleteClick: () => void;
}

export default function ClinicActions({
  clinic,
  disabled,
  saving,
  deleting,
  onEdit,
  onDeleteClick,
}: ClinicActionsProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-2
      "
    >
      {/* Edit */}
      <button
        type="button"
        title="ویرایش کلینیک"
        disabled={disabled}
        onClick={() => onEdit(clinic)}
        className="
          flex
          items-center
          justify-center
          gap-1.5
          rounded-xl
          border
          border-blue-100
          bg-blue-50
          px-4
          py-2
          text-xs
          font-bold
          text-blue-600
          transition-all
          duration-200
          hover:border-blue-600
          hover:bg-blue-600
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdEdit size={16} />

        <span>{saving ? "در حال ذخیره..." : "ویرایش"}</span>
      </button>

      {/* Delete */}
      <button
        type="button"
        title="حذف کلینیک"
        disabled={disabled}
        onClick={onDeleteClick}
        className="
          flex
          items-center
          justify-center
          gap-1.5
          rounded-xl
          border
          border-red-100
          bg-red-50
          px-4
          py-2
          text-xs
          font-bold
          text-red-600
          transition-all
          duration-200
          hover:border-red-600
          hover:bg-red-600
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdDelete size={16} />

        <span>{deleting ? "در حال حذف..." : "حذف"}</span>
      </button>
    </div>
  );
}
