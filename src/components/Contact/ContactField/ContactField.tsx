import type { ContactFieldProps } from "@/Types/types";

export default function ContactField({
  type,
  placeholder,
  name,
  register,
  error,
}: ContactFieldProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-gray-200
          px-5
          text-black
          outline-none
          transition
          focus:ring-2
          focus:ring-[#1F7168]
        "
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
