"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  open: boolean;
  children: React.ReactNode;
};

const MobileMenuPanel: H.React.FC<Props> = ({ open, children }) => {
  return (
    <aside
      id="mobile-main-menu"
      role="dialog"
      aria-modal="true"
      aria-label="منوی اصلی"
      aria-hidden={!open}
      className={`
        fixed
        inset-y-0
        right-0
        z-50
        flex
        h-dvh
        w-[min(88vw,390px)]
        flex-col
        overflow-hidden
        bg-white
        text-slate-900
        shadow-[-12px_0_40px_rgba(15,23,42,0.14)]
        md:hidden
        transform
        transition-transform
        duration-300
        ease-out
        motion-reduce:transition-none
        ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}
      `}
    >
      {children}
    </aside>
  );
};

export default MobileMenuPanel;
