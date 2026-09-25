"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

type Props = {
  icon: H.React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isLogout?: boolean;
};

export const MenuItem: H.React.FC<Props> = ({
  icon,
  label,
  href,
  onClick,
  isLogout = false,
}) => {
  const baseClasses =
    "flex items-center gap-3 py-2 px-3 rounded-lg transition cursor-pointer";

  const colorClasses = isLogout
    ? "text-gray-700 hover:bg-red-50 hover:text-red-600"
    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600";

  if (href) {
    return (
      <H.Link
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${colorClasses}`}
      >
        <div className="w-6 flex items-center justify-center">{icon}</div>
        <span className="font-medium">{label}</span>
      </H.Link>
    );
  }

  return (
    <div onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
      <div className="w-6 flex items-center justify-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  );
};
