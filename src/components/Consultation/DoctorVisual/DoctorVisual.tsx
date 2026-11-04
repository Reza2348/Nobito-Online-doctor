import Image from "next/image";

const DoctorVisual = () => (
  <div className="relative min-h-96 bg-surface">
    <Image
      src="/Photo-Doctor.avif"
      alt="پزشک برای مشاوره آنلاین"
      fill
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="object-cover"
    />
  </div>
);

export default DoctorVisual;
