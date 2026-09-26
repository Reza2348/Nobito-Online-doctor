import Image from "next/image";

interface ClinicsImageSectionProps {
  image: string;
  alt?: string;
}

const ClinicsImageSection = ({
  image,
  alt = "Clinic",
}: ClinicsImageSectionProps) => {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-t-2xl">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default ClinicsImageSection;
