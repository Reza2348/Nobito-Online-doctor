interface Props {
  fields: string[];
}

const DoctorFields: React.FC<Props> = ({ fields }) => {
  return (
    <div
      className="
      flex
      flex-wrap
      justify-start
      gap-2
      "
    >
      {fields.map((field, idx) => (
        <span
          key={idx}
          className="
          rounded-full
          border
          border-teal-100
          bg-teal-50
          px-3
          py-1.5
          text-xs
          font-semibold
          text-teal-700
          transition-all
          duration-300
          hover:bg-teal-600
          hover:text-white
          "
        >
          {field}
        </span>
      ))}
    </div>
  );
};

export default DoctorFields;
