"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  open: boolean;
  children: React.ReactNode;
};

const MobileMenuPanel: H.React.FC<Props> = ({ open, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white z-50 md:hidden
      transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {children}
    </div>
  );
};

export default MobileMenuPanel;
