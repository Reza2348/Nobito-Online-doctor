"use client";

interface Props {
  fields: string[];
}

const ConsultantFields: React.FC<Props> = ({ fields }) => {
  return (
    <div
      className="
      mt-6
      flex
      min-h-15
      flex-wrap
      items-center
      justify-center
      gap-2
      "
    >
      {fields.map((field) => (
        <span
          key={field}
          className="
          rounded-full
          bg-teal-50
          px-4
          py-2
          text-xs
          font-bold
          text-teal-700
          transition-all
          duration-300
          hover:bg-teal-600
          hover:text-white
          hover:shadow-md
          "
        >
          {field}
        </span>
      ))}
    </div>
  );
};

export default ConsultantFields;
