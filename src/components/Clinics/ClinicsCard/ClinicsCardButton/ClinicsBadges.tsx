import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { ReactNode } from "react";

interface ClinicsCardButtonProps {
  href: string;
  children?: ReactNode;
}

const ClinicsCardButton = ({
  href,
  children = "View Clinic",
}: ClinicsCardButtonProps) => {
  return (
    <Link
      href={href}
      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
    >
      {children}

      <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
};

export default ClinicsCardButton;
