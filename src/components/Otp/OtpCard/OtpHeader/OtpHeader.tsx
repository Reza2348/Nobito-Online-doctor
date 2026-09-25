interface OtpHeaderProps {
  title?: string;
  description?: string;
}

export default function OtpHeader({
  title = "وارد کردن کد تایید ایمیل",
  description = "لطفا کد ۸ رقمی ارسال شده به ایمیل خود را وارد کنید.",
}: OtpHeaderProps) {
  return (
    <>
      <h1
        className="
          mb-2
          text-center
          text-xl
          font-bold
          text-black
          sm:text-2xl
        "
      >
        {title}
      </h1>

      <p
        className="
          mb-1
          text-center
          text-xs
          text-gray-500
          sm:text-sm
        "
      >
        {description}
      </p>
    </>
  );
}
