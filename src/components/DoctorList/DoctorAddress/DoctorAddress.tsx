import * as D from "@/Imports/DoctorListImports/DoctorListImports";

interface Props {
  address: string;
}

const DoctorAddress: React.FC<Props> = ({ address }) => {
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <D.FiMapPin className="shrink-0" size={16} />
      <span className="truncate">نشانی : {address}</span>
    </div>
  );
};

export default DoctorAddress;
