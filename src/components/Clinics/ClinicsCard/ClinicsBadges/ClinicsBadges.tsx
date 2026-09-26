import { FaStar, FaCheckCircle } from "react-icons/fa";

interface ClinicsBadgesProps {
  rating?: number;
  verified?: boolean;
  category?: string;
}

const ClinicsBadges = ({
  rating = 0,
  verified = false,
  category,
}: ClinicsBadgesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {rating > 0 && (
        <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-600">
          <FaStar className="text-yellow-500" />
          {rating}
        </span>
      )}

      {verified && (
        <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
          <FaCheckCircle />
          Verified
        </span>
      )}

      {category && (
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          {category}
        </span>
      )}
    </div>
  );
};

export default ClinicsBadges;
