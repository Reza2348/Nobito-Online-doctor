import React from "react";

interface PrescriptionActionButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  variant: "secondary" | "primary";
  loading?: boolean;
}

export default function PrescriptionActionButton({
  icon,
  children,
  onClick,
  variant,
  loading = false,
}: PrescriptionActionButtonProps) {
  const variantClass =
    variant === "primary"
      ? `
        bg-blue-600
        text-white
        hover:bg-blue-700
      `
      : `
        border
        border-gray-200
        bg-white
        text-gray-700
        hover:bg-gray-50
      `;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        text-sm
        font-medium
        shadow-sm
        transition
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantClass}
      `}
    >
      {icon}

      {loading ? "در حال آماده‌سازی..." : children}
    </button>
  );
}
