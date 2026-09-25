import Image from "next/image";

const insuranceLogos = [
  {
    src: "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(4).svg",
    alt: "بیمه ۱",
  },
  {
    src: "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(3).svg",
    alt: "بیمه ۲",
  },
  {
    src: "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(2).svg",
    alt: "بیمه ۳",
  },
  {
    src: "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(1).svg",
    alt: "بیمه ۴",
  },
  {
    src: "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic.svg",
    alt: "بیمه ۵",
  },
];

function InsuranceLogos({
  size = 70,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <>
      {insuranceLogos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={size}
          height={size}
          sizes={`${size}px`}
          className={className}
        />
      ))}
    </>
  );
}

export default function InsuranceBanner() {
  return (
    <section
      aria-label="بیمه‌های طرف قرارداد نوبیتو"
      className="relative w-full bg-white mt-64 sm:mt-28 mb-10 sm:mb-16"
    >
      {/* Mobile */}
      <div className="flex flex-col items-center bg-[#1F7168] sm:hidden px-6 pt-6 pb-0">
        <div className="text-center mb-6">
          <p className="text-xl font-bold text-[#FFE4BC]">
            بیمه های طرف قرارداد
          </p>
          <p className="text-xl font-bold text-[#FFE4BC]">نوبیتو</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <InsuranceLogos size={64} className="w-16 h-16" />
        </div>

        <div className="flex justify-center">
          <Image
            src="/wepik-export-20231213034029dMG2 1.svg"
            alt="نوبیتو"
            width={260}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="bg-[#1F7168] h-28 hidden sm:flex items-center justify-between px-8">
        <div className="relative h-full flex items-end shrink-0">
          <Image
            src="/wepik-export-20231213034029dMG2 1.svg"
            alt="نوبیتو"
            width={170}
            height={300}
            style={{ width: "auto", height: "auto" }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-[#FFE4BC]">بیمه های طرف</p>
          <p className="text-xl font-bold text-[#FFE4BC]">قرارداد نوبیتو</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <InsuranceLogos size={70} />
        </div>
      </div>
    </section>
  );
}
