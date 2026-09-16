interface OtpEmailInfoProps {
  email?: string;
}

export default function OtpEmailInfo({ email }: OtpEmailInfoProps) {
  if (!email) {
    return null;
  }

  return (
    <div
      className="
        mb-4
        text-xs
        text-gray-600
        sm:text-sm
      "
    >
      کد به{" "}
      <span dir="ltr" className="font-medium text-gray-800">
        {email}
      </span>{" "}
      ارسال شد
    </div>
  );
}
