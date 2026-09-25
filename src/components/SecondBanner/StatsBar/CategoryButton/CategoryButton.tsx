import { Sparkle } from "../icons";
import type { Category } from "../categories/categories";

interface Props {
  category: Category;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export default function CategoryButton({
  category,
  isActive,
  onSelect,
}: Props) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(category.id)}
      className="
        group
        flex
        w-28
        flex-col
        items-center
        gap-3
        rounded-2xl
        outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1F7168]/35
        focus-visible:ring-offset-4
        sm:w-32
      "
    >
      {/* Icon container */}
      <span
        className={`
          relative
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-white
          border-2
          transition-all
          duration-300
          ease-out
          sm:h-28
          sm:w-28

          ${
            isActive
              ? `
                border-[#1F7168]
                shadow-[0_0_0_4px_rgba(31,113,104,0.08)]
                -translate-y-0.5
              `
              : `
                border-transparent
                shadow-[0_4px_16px_rgba(0,0,0,0.025)]
                group-hover:-translate-y-1
                group-hover:border-[#DCE9E6]
                group-hover:shadow-[0_8px_24px_rgba(31,113,104,0.08)]
              `
          }
        `}
      >
        {/* Decorative sparkles */}
        <Sparkle
          className="
            pointer-events-none
            absolute
            -left-1
            top-2
            h-3
            w-3
            opacity-70
            transition-transform
            duration-300
            group-hover:scale-125
          "
        />

        <Sparkle
          className="
            pointer-events-none
            absolute
            -right-1
            bottom-3
            h-3
            w-3
            rotate-45
            opacity-70
            transition-transform
            duration-300
            group-hover:rotate-90
          "
        />

        {/* Icon */}
        <span
          className="
            h-12
            w-12
            transition-transform
            duration-300
            ease-out
            group-hover:scale-105
            sm:h-14
            sm:w-14
          "
        >
          <Icon />
        </span>
      </span>

      {/* Label */}
      <span
        className={`
          relative
          whitespace-nowrap
          text-sm
          leading-6
          transition-colors
          duration-200

          ${
            isActive
              ? "font-bold text-[#1F7168]"
              : "font-medium text-gray-500 group-hover:text-gray-700"
          }
        `}
        style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
      >
        {category.label}

        {/* Active indicator */}
        <span
          aria-hidden="true"
          className={`
            absolute
            -bottom-1
            left-1/2
            h-0.5
            -translate-x-1/2
            rounded-full
            bg-[#1F7168]
            transition-all
            duration-300

            ${isActive ? "w-5 opacity-100" : "w-0 opacity-0"}
          `}
        />
      </span>
    </button>
  );
}
