import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getBeautyItems } from "@/components/ThirdBanner/Beauty/Beautyservice";

const BeautyCategories = async () => {
  const items = await getBeautyItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className="
          mx-6
          grid
          grid-cols-2
          gap-4
          sm:mx-8
          sm:grid-cols-3
          md:mx-10
          md:grid-cols-4
          lg:mx-12
          lg:grid-cols-6
          lg:gap-5
          xl:mx-16
        "
      >
        {items.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="
              group
              flex
              h-full
              min-h-125
              flex-col
              items-center
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              text-center
              shadow-[0_8px_30px_rgba(0,0,0,.06)]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-teal-200
              hover:shadow-[0_20px_50px_rgba(0,0,0,.12)]
            "
          >
            {/* PHOTO */}
            <div
              className="
                relative
                h-32
                w-32
                shrink-0
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-gray-50
                shadow-sm
                transition-all
                duration-500
                group-hover:shadow-md
              "
            >
              <Image
                src={item.photo_url}
                alt={item.title}
                fill
                sizes="128px"
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />
            </div>

            {/* NAME */}
            <h2
              className="
                mt-5
                text-xl
                font-extrabold
                text-gray-900
                transition-colors
                duration-300
                group-hover:text-emerald-600
              "
            >
              {item.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-2 text-sm text-gray-500">
              خدمات زیبایی با تخفیف ویژه
            </p>

            {/* SPACE */}
            <div className="flex-1" />

            {/* BUTTON */}
            <Link
              href={`/services/${item.slug}`}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-linear-to-r
                from-teal-600
                to-emerald-500
                py-3
                font-bold
                text-white
                transition-all
                duration-300
                hover:shadow-lg
              "
            >
              مشاهده خدمات
              <FiArrowLeft
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyCategories;
