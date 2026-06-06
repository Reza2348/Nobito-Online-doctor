import Image from "next/image";

export default function InsuranceBanner() {
  return (
    <div className="relative w-full bg-white mt-28">
      {/* حالت موبایل - layout عمودی */}
      <div className="flex flex-col items-center bg-[#1F7168] sm:hidden px-6 pt-6 pb-0">
        {/* متن - بالا */}
        <div className="text-center mb-6">
          <p className="text-xl font-bold text-[#FFE4BC]">
            بیمه های طرف قرارداد
          </p>
          <p className="text-xl font-bold text-[#FFE4BC]">نوینتو</p>
        </div>

        {/* لوگوها - وسط، 2 ردیف */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Image
            src="/Pic (4).svg"
            alt=""
            width={70}
            height={70}
            className="w-16 h-16"
          />
          <Image
            src="/Pic (3).svg"
            alt=""
            width={70}
            height={70}
            className="w-16 h-16"
          />
          <Image
            src="/Pic (2).svg"
            alt=""
            width={70}
            height={70}
            className="w-16 h-16"
          />
          <Image
            src="/Pic (1).svg"
            alt=""
            width={70}
            height={70}
            className="w-16 h-16"
          />
          <Image
            src="/Pic.svg"
            alt=""
            width={70}
            height={70}
            className="w-16 h-16"
          />
        </div>

        {/* آدم - پایین، بزرگ */}
        <div className="flex justify-center">
          <Image
            src="/wepik-export-20231213034029dMG2 1.svg"
            alt="person"
            width={260}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      {/* حالت دسکتاپ - layout افقی */}
      <div className="bg-[#1F7168] h-28 hidden sm:flex items-center justify-between px-8 mt-20 mb-5">
        {/* آدم - راست */}
        <div className="relative h-full flex items-end shrink-0">
          <Image
            src="/wepik-export-20231213034029dMG2 1.svg"
            alt="person"
            width={160}
            height={180}
            className="object-contain w-40"
          />
        </div>

        {/* متن - وسط */}
        <div className="flex flex-col items-center justify-center mb-6">
          <p className="text-xl font-bold text-[#FFE4BC]">بیمه های طرف</p>
          <p className="text-xl font-bold text-[#FFE4BC]">قرارداد نوبیتو</p>
        </div>

        {/* لوگوها - چپ */}
        <div className="flex items-center gap-4 shrink-0">
          <Image src="/Pic (4).svg" alt="" width={70} height={70} />
          <Image src="/Pic (3).svg" alt="" width={70} height={70} />
          <Image src="/Pic (2).svg" alt="" width={70} height={70} />
          <Image src="/Pic (1).svg" alt="" width={70} height={70} />
          <Image src="/Pic.svg" alt="" width={70} height={70} />
        </div>
      </div>
    </div>
  );
}
