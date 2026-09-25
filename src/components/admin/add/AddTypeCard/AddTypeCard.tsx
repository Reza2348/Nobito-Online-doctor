"use client";

type AddType = "doctor" | "consultant" | "clinic";

interface AddTypeCardProps {
  type: AddType;
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function AddTypeCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: AddTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border-2 bg-white p-6 text-right transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        selected
          ? "border-blue-600 shadow-md"
          : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {selected && (
        <div className="mt-5 text-sm font-medium text-blue-600">
          انتخاب شد ✓
        </div>
      )}
    </button>
  );
}
