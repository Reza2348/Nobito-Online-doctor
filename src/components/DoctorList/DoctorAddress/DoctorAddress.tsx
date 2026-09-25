import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  address: string;
}

const DoctorAddress: React.FC<Props> = ({ address }) => {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      rounded-2xl
      bg-gray-50
      px-4
      py-3
      text-sm
      text-gray-600
      "
    >
      <div
        className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-teal-50
        text-teal-600
        "
      >
        <D.FiMapPin size={18} />
      </div>

      <span className="truncate font-medium">{address}</span>
    </div>
  );
};

export default DoctorAddress;
