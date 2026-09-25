import React from "react";
import { FiArrowLeft } from "react-icons/fi";

interface SectionTitleProps {
  icon: React.ReactNode;
  title?: string;
  highlight: string;
  description: string;
  action?: string;
}

export default function SectionTitle({
  icon,
  title,
  highlight,
  description,
  action = "مشاهده همه",
}: SectionTitleProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-3xl
          bg-linear-to-br
          from-emerald-50
          to-teal-100
          text-emerald-600
          shadow-sm
        "
      >
        {icon}
      </div>

      <div className="flex-1 text-right">
        <h2 className="text-2xl font-black text-gray-900">
          {title && `${title} `}
          <span className="text-emerald-600">{highlight}</span>
        </h2>

        <p className="mt-1 text-sm text-gray-400">{description}</p>

        <div
          className="
            mt-3
            h-0.75
            w-full
            rounded-full
            bg-linear-to-l
            from-emerald-500
            via-emerald-200
            to-transparent
          "
        />
      </div>

      <button
        className="
          group
          hidden
          items-center
          gap-2
          rounded-full
          bg-emerald-50
          px-5
          py-2.5
          text-sm
          font-bold
          text-emerald-700
          transition-all
          duration-300
          hover:bg-emerald-600
          hover:text-white
          sm:flex
        "
      >
        {action}

        <FiArrowLeft
          className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
        />
      </button>
    </div>
  );
}
