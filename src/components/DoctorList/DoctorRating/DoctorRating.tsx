import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  rating?: string;
}

const DoctorRating: React.FC<Props> = ({ rating }) => {
  return (
    <div
      className="
      flex
      items-center
      gap-2
      rounded-full
      bg-yellow-50
      px-3
      py-1.5
      "
    >
      <D.FaStar
        className="
        text-yellow-400
        "
        size={16}
      />

      <span
        className="
        text-sm
        font-extrabold
        text-yellow-700
        "
      >
        {rating ?? "۴.۸"}
      </span>

      <span
        className="
        text-xs
        text-yellow-600
        "
      >
        عالی
      </span>
    </div>
  );
};

export default DoctorRating;
