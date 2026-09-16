interface StatusSwitchProps {
  title: string;
  active: boolean;
  onToggle: () => void;
}

export function StatusSwitch({ title, active, onToggle }: StatusSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={`تغییر وضعیت ${title}`}
      onClick={onToggle}
      className="
        relative
        inline-flex
        shrink-0
        cursor-pointer
        items-center
        rounded-full
        outline-none
        focus-visible:ring-2
        focus-visible:ring-emerald-500
        focus-visible:ring-offset-2
      "
    >
      <span
        aria-hidden="true"
        className={`
          relative
          h-7
          w-12
          rounded-full
          shadow-inner
          ring-1
          ring-inset
          ring-black/5
          transition-all
          duration-300
          ease-out
          ${
            active
              ? `
                bg-emerald-500
                shadow-[0_3px_10px_rgba(16,185,129,0.30)]
              `
              : `
                bg-gray-300
                hover:bg-gray-400
              `
          }
          after:absolute
          after:right-1
          after:top-1
          after:h-5
          after:w-5
          after:rounded-full
          after:bg-white
          after:shadow-[0_1px_4px_rgba(0,0,0,0.20)]
          after:transition-transform
          after:duration-300
          after:ease-out
          ${active ? "after:-translate-x-5" : "after:translate-x-0"}
        `}
      />
    </button>
  );
}
