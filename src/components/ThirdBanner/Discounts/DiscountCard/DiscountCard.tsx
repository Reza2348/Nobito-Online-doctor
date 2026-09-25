import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";

import type { DiscountItem } from "@/Types/types";

import DiscountBadge from "../DiscountBadge/DiscountBadge";

const formatToman = (value: number) => `${value.toLocaleString("fa-IR")} تومان`;

interface Props {
  item: DiscountItem;
}

export default function DiscountCard({ item }: Props) {
  return (
    <Link
      href={`/discounts/${item.slug}`}
      className="
        group
        flex
        h-full
        min-h-107.5
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-gray-100
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-emerald-200
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.11)]
      "
    >
      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/40
            via-transparent
            to-black/5
          "
        />

        <DiscountBadge percent={item.discount_percent} />

        {/* QUICK LABEL */}
        <div
          className="
            absolute
            bottom-4
            right-4
            rounded-full
            bg-white/90
            px-3
            py-1.5
            text-[11px]
            font-bold
            text-gray-700
            shadow-sm
            backdrop-blur-md
          "
        >
          پیشنهاد ویژه
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        {/* TITLE */}
        <h3
          className="
            line-clamp-2
            min-h-12
            text-[15px]
            font-black
            leading-6
            text-gray-900
            transition-colors
            duration-300
            group-hover:text-emerald-700
          "
        >
          {item.title}
        </h3>

        {/* SPECIALTY */}
        <p className="mt-2 line-clamp-1 text-xs font-medium text-gray-400">
          {item.specialty ?? item.provider_name}
        </p>

        {/* PRICE */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 line-through">
              {formatToman(item.original_price)}
            </span>

            <span
              className="
                rounded-full
                bg-red-50
                px-2
                py-1
                text-[10px]
                font-bold
                text-red-600
              "
            >
              {item.discount_percent.toLocaleString("fa-IR")}٪
            </span>
          </div>

          <div className="mt-1 flex items-baseline gap-1">
            <span
              className="
                text-xl
                font-black
                tracking-tight
                text-emerald-700
              "
            >
              {formatToman(item.final_price)}
            </span>
          </div>
        </div>

        {/* LOCATION */}
        <div
          className="
            mt-auto
            flex
            items-center
            gap-2
            border-t
            border-gray-100
            pt-4
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gray-50
              text-gray-500
            "
          >
            <FiMapPin size={15} />
          </div>

          <span className="truncate text-xs font-medium text-gray-500">
            {item.city} : {item.address}
          </span>
        </div>

        {/* CTA */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-linear-to-r
            from-teal-600
            to-emerald-500
            py-3
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            group-hover:shadow-lg
          "
        >
          مشاهده تخفیف
          <FiArrowLeft
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-1
            "
          />
        </div>
      </div>
    </Link>
  );
}
