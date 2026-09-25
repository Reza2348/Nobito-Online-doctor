import * as H from "@/Imports/HeaderImports/HeaderImports";

interface Props {
  onClose: () => void;
}

export default function MobileMenuHeader({ onClose }: Props) {
  return (
    <header
      className="
        flex h-16 shrink-0
        items-center justify-between
        border-b border-slate-100
        bg-white px-4
      "
    >
      {/* LOGO */}
      <H.Link
        href="/"
        onClick={onClose}
        aria-label="صفحه اصلی نوبیتو"
        className="
          inline-flex items-center
          rounded-lg
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
        "
      >
        <img
          src="/Default.svg"
          alt="نوبیتو"
          width={120}
          height={48}
          loading="eager"
          decoding="async"
          className="
            h-auto w-25
            object-contain
            sm:w-30
          "
        />
      </H.Link>

      {/* CLOSE */}
      <button
        type="button"
        onClick={onClose}
        aria-label="بستن منوی موبایل"
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          text-slate-700
          transition-colors duration-200
          hover:bg-slate-100
          hover:text-slate-900
          active:bg-slate-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
          motion-reduce:transition-none
        "
      >
        <H.HiX size={24} aria-hidden="true" />
      </button>
    </header>
  );
}
