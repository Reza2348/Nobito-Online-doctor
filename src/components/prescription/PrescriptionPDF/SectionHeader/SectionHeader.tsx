import { IconType } from "react-icons";

interface SectionHeaderProps {
  icon: IconType;
  title: string;
  gradient?: string;
}

export default function SectionHeader({
  icon: Icon,
  title,
  gradient = "from-blue-500 to-blue-600",
}: SectionHeaderProps) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br ${gradient} text-white`}
      >
        <Icon className="text-xs" />
      </div>

      <h2 className="m-0 text-sm font-extrabold text-blue-800">{title}</h2>
    </div>
  );
}
