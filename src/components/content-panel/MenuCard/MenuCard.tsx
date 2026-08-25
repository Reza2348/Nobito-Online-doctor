"use client";

import type { MenuCardProps } from "@/Types/types";

export default function MenuCard({
  title,
  description,
  icon: Icon,
  color,
}: MenuCardProps) {
  return (
    <div className="group cursor-pointer rounded-3xl bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Icon */}
      <div
        className={`
          flex h-16 w-16
          items-center justify-center
          rounded-2xl
         bg-linear-to-br
          ${color}
          text-white
          shadow-lg
          transition-transform
          duration-300
          group-hover:scale-110
        `}
      >
        <Icon className="text-2xl" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-black text-gray-800">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm leading-6 text-gray-500">{description}</p>

      {/* Button */}
      <button
        type="button"
        className="
          mt-5
          text-sm
          font-bold
          text-blue-600
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:opacity-100
        "
      >
        ورود →
      </button>
    </div>
  );
}
