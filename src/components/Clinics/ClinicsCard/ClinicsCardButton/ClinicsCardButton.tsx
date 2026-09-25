import { FiArrowLeft } from "react-icons/fi";

export default function ClinicsCardButton() {
  return (
    <button
      className="
        mt-auto
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-linear-to-r
        from-teal-600
        to-emerald-500
        py-3
        font-bold
        text-white
        transition-all
        duration-300
        hover:shadow-lg
        "
    >
      مشاهده کلینیک
      <FiArrowLeft
        className="
          transition-transform
          duration-300
          group-hover:-translate-x-1
          "
      />
    </button>
  );
}
