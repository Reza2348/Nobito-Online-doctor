"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MobileMenuOverlay: H.React.FC<Props> = ({ open, onClose }) => {
  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className={`
        fixed
        inset-0
        z-40
        md:hidden
        bg-slate-950/45
        backdrop-blur-[3px]
        transition-opacity
        duration-300
        ease-out
        motion-reduce:transition-none
        ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }
      `}
    />
  );
};

export default MobileMenuOverlay;
