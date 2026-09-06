import { MdClose } from "react-icons/md";

interface EntityFormHeaderProps {
  title: string;
  description?: string;
  saving: boolean;
  onClose: () => void;
}

export default function EntityFormHeader({
  title,
  description,
  saving,
  onClose,
}: EntityFormHeaderProps) {
  return (
    <div
      className="
        flex items-center justify-between
        border-b border-gray-100
        px-6 py-5
      "
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        disabled={saving}
        aria-label="بستن"
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          bg-gray-100
          text-gray-600
          transition
          hover:bg-red-50
          hover:text-red-600
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <MdClose size={22} />
      </button>
    </div>
  );
}
