import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  rating?: string;
}

const DoctorRating: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold text-gray-700 text-sm">{rating ?? "۴/۵"}</span>
      <D.FaStar className="text-amber-400" size={18} />
    </div>
  );
};

export default DoctorRating;
