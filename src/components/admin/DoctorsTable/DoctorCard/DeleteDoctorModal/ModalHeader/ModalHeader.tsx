import { MdWarning } from "react-icons/md";

export default function ModalHeader() {
  return (
    <div
      className="
        bg-linear-to-br
        from-red-50
        via-white
        to-orange-50
        px-7
        pb-7
        pt-9
      "
    >
      <div className="flex justify-center">
        <div
          className="
            relative
            flex h-19.5 w-19.5
            items-center justify-center
            rounded-[26px]
            bg-red-100
            text-red-600
          "
        >
          <span
            className="
              absolute
              -inset-2
              rounded-[30px]
              border
              border-red-100
            "
          />

          <MdWarning size={35} />
        </div>
      </div>

      <div className="mt-5 text-center">
        <h3
          id="delete-doctor-title"
          className="text-xl font-black text-slate-900"
        >
          حذف پزشک
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          اطلاعات این پزشک از پنل مدیریت حذف خواهد شد.
        </p>
      </div>
    </div>
  );
}
