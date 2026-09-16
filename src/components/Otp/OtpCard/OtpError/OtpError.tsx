import { MdErrorOutline } from "react-icons/md";

interface OtpErrorProps {
  error?: string;
}

export default function OtpError({ error }: OtpErrorProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="
        mt-3
        min-h-5
        w-full
        text-center
      "
    >
      {error && (
        <p
          className="
            flex
            items-center
            justify-center
            gap-1.5
            text-sm
            font-medium
            text-red-500
          "
        >
          <MdErrorOutline size={17} />
          {error}
        </p>
      )}
    </div>
  );
}
