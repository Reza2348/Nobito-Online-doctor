"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MobileMenuOverlay: H.React.FC<Props> = ({ open, onClose }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    />
  );
};

export default MobileMenuOverlay;
