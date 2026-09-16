import { MdPersonOutline } from "react-icons/md";

export default function EmptyUsers() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <MdPersonOutline size={40} className="text-gray-300" />

      <p className="text-sm text-gray-400">کاربری یافت نشد</p>
    </div>
  );
}
