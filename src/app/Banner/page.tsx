import Image from "next/image";

const insuranceLogos = [
  "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(4).svg",
  "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(3).svg",
  "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(2).svg",
  "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic%20(1).svg",
  "https://yvafbrsbeisaqtdsdowr.supabase.co/storage/v1/object/public/publics/Pic.svg",
];
export default function InsuranceBanner() {
  return (
    <div className="relative w-full bg-white mt-28">
      {/* Mobile */}
      <div className="flex flex-col items-center bg-[#1F7168] sm:hidden px-6 pt-6 pb-0">
        <div className="text-center mb-6">
          <p className="text-xl font-bold text-[#FFE4BC]">
            بیمه های طرف قرارداد
          </p>
          <p className="text-xl font-bold text-[#FFE4BC]">نوینتو</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {insuranceLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Insurance Logo ${index + 1}`}
              width={70}
              height={70}
              className="w-16 h-16"
            />
          ))}
        </div>

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

      {/* Desktop */}
      <div className="bg-[#1F7168] h-28 hidden sm:flex items-center justify-between px-8 mt-20 mb-5">
        <div className="relative h-full flex items-end shrink-0">
          <Image
            src="/wepik-export-20231213034029dMG2 1.svg"
            alt="person"
            width={170}
            height={300}
          />
        </div>

        <div className="flex flex-col items-center justify-center mb-6">
          <p className="text-xl font-bold text-[#FFE4BC]">بیمه های طرف</p>
          <p className="text-xl font-bold text-[#FFE4BC]">قرارداد نوینتو</p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {insuranceLogos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Insurance Logo ${index + 1}`}
              width={70}
              height={70}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
