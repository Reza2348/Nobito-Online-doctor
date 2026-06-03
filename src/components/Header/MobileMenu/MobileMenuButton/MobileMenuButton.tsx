"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  onClick: () => void;
};

const MobileMenuButton: H.React.FC<Props> = ({ onClick }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onClick}
        className="p-2 rounded-md hover:bg-gray-100 transition"
      >
        <H.HiMenu size={26} className="text-gray-700" />
      </button>
    </div>
  );
};

export default MobileMenuButton;
