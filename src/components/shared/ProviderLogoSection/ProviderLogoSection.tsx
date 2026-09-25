import Image from "next/image";

interface LogoSectionProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function LogoSection({
  src = "/logo1.svg",
  alt = "logo",
  width = 100,
  height = 100,
  className = "",
}: LogoSectionProps) {
  return (
    <div className={`flex justify-center mb-4 ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} priority />
    </div>
  );
}
