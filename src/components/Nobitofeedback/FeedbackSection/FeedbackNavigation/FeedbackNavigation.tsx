import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  count: number;
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function FeedbackNavigation({
  count,
  activeIndex,
  onChange,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        type="button"
        aria-label="قبلی"
        disabled={activeIndex === 0}
        onClick={() => onChange(Math.max(activeIndex - 1, 0))}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40"
      >
        <FaChevronRight size={14} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`بازخورد ${index + 1}`}
            onClick={() => onChange(index)}
            className={
              index === activeIndex
                ? "h-2 w-6 rounded-full bg-[#1F7168] transition-all duration-300"
                : "h-2 w-2 rounded-full bg-gray-300 transition-all duration-300"
            }
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="بعدی"
        disabled={activeIndex === count - 1}
        onClick={() => onChange(Math.min(activeIndex + 1, count - 1))}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40"
      >
        <FaChevronLeft size={14} />
      </button>
    </div>
  );
}
