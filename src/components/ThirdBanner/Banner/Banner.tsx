import Image from "next/image";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section dir="rtl" className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* کارت اول */}
          <div
            className="
              flex
              items-center
              gap-6
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
              sm:p-8
            "
          >
            <div className="flex-1 space-y-2 text-right">
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                آزمایش در محل
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان لازم است، و برای شرایط
              </p>
            </div>

            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
              <Image
                src="/contebt.png"
                alt="آزمایش در محل"
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* کارت دوم */}
          <div
            className="
              flex
              items-center
              gap-6
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
              sm:p-8
            "
          >
            <div className="flex-1 space-y-2 text-right">
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                پرستار در منزل
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان لازم است، و برای شرایط
              </p>
            </div>

            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
              <Image
                src="/contebt (1).png"
                alt="مشاوره آنلاین"
                fill
                sizes="128px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
