import { FiTag } from "react-icons/fi";

interface Props {
  percent: number;
}

export default function DiscountBadge({ percent }: Props) {
  return (
    <div
      className="
        absolute
        right-4
        top-4
        flex
        items-center
        gap-1.5
        rounded-full
        border
        border-white/30
        bg-red-500/95
        px-3.5
        py-2
        text-xs
        font-black
        text-white
        shadow-lg
        backdrop-blur-md
      "
    >
      <FiTag size={13} />
      {percent.toLocaleString("fa-IR")}٪ تخفیف
    </div>
  );
}
