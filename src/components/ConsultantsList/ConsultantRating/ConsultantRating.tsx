"use client";

interface Props {
  rating?: number;
}

const ConsultantRating: React.FC<Props> = ({ rating }) => {
  return (
    <div
      className="
      mt-4
      flex
      items-center
      gap-2
      rounded-full
      bg-yellow-50
      px-4
      py-2
      "
    >
      <span className="text-lg">⭐</span>

      <span
        className="
        font-bold
        text-yellow-700
        "
      >
        {rating ?? "4.9"}
      </span>

      <span
        className="
        text-xs
        text-yellow-600
        "
      >
        رضایت بالا
      </span>
    </div>
  );
};

export default ConsultantRating;
