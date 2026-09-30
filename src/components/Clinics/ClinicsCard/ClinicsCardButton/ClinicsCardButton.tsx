import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ReactNode } from "react";

interface ClinicsCardButtonProps {
  href: string;
  children?: ReactNode;
}

const ClinicsCardButton = ({
  href,
  children = "مشاهده کلینیک",
}: ClinicsCardButtonProps) => {
  return (
    <Link
      href={href}
      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-teal-600 to-emerald-500 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg"
    >
      {children}

      <FiArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
    </Link>
  );
};

export default ClinicsCardButton;
