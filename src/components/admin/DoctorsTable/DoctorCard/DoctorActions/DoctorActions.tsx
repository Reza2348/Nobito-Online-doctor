import { MdDelete, MdEdit } from "react-icons/md";

import type { AdminDoctor } from "@/Types/types";

interface Props {
  doctor: AdminDoctor;
  saving: boolean;
  onEdit: (doctor: AdminDoctor) => void;
  onDelete: () => void;
}

export default function DoctorActions({
  doctor,
  saving,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div
      className="
        flex shrink-0
        items-center gap-2
        lg:self-start
      "
    >
      <button
        type="button"
        disabled={saving}
        onClick={() => onEdit(doctor)}
        className="
          inline-flex
          h-11
          items-center
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-bold
          text-slate-700
          shadow-sm
          transition-all
          hover:border-blue-200
          hover:bg-blue-50
          hover:text-blue-700
          focus:outline-none
          focus:ring-4
          focus:ring-blue-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdEdit size={18} />
        <span>ویرایش</span>
      </button>

      <button
        type="button"
        disabled={saving}
        onClick={onDelete}
        className="
          inline-flex
          h-11
          items-center
          gap-2
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-bold
          text-slate-600
          shadow-sm
          transition-all
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-600
          focus:outline-none
          focus:ring-4
          focus:ring-red-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdDelete size={18} />

        <span>{saving ? "در حال انجام..." : "حذف"}</span>
      </button>
    </div>
  );
}
