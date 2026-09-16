import { FiCheckCircle, FiFile } from "react-icons/fi";

interface PhotoMetaProps {
  hasPhoto: boolean;
}

export function PhotoMeta({ hasPhoto }: PhotoMetaProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <FiFile size={13} />
        <span>حداکثر حجم: ۵ مگابایت</span>
      </div>

      {hasPhoto && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-green-600">
          <FiCheckCircle size={13} />
          <span>تصویر انتخاب شده</span>
        </div>
      )}
    </div>
  );
}
