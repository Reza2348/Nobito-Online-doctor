"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  onClick: () => void;
  isOpen?: boolean;
};

const MobileMenuButton: H.React.FC<Props> = ({ onClick, isOpen = false }) => {
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onClick}
        aria-label={isOpen ? "بستن منوی اصلی" : "باز کردن منوی اصلی"}
        aria-expanded={isOpen}
        aria-controls="mobile-main-menu"
        className="
          inline-flex
          min-h-11
          min-w-11
          items-center
          justify-center
          rounded-xl
          border
          border-transparent
          text-gray-700
          transition-all
          duration-200
          hover:border-emerald-100
          hover:bg-emerald-50
          hover:text-emerald-700
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
          focus-visible:ring-offset-2
        "
      >
        <H.HiMenu size={26} aria-hidden="true" />
      </button>
    </div>
  );
};

export default MobileMenuButton;
