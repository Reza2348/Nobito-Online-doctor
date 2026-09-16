import Image from "next/image";

interface LogoSectionProps {
  className?: string;
}

export default function LogoSection({ className = "" }: LogoSectionProps) {
  return (
    <div
      className={`
        mb-6
        flex
        items-center
        justify-center
        ${className}
      `}
    >
      <Image
        src="/images/logo.png"
        alt="نوبیتو"
        width={120}
        height={120}
        priority
        className="h-auto w-24 sm:w-28"
      />
    </div>
  );
}
