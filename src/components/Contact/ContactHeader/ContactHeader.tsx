export default function ContactHeader() {
  return (
    <div className="text-center md:text-right">
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-green-100
          px-4
          py-2
          text-sm
          font-medium
          text-green-700
        "
      >
        ارتباط امن با ما
      </span>

      <h2
        className="
          mt-5
          text-3xl
          font-black
          leading-tight
          text-gray-900
          md:text-5xl
        "
      >
        با ما در ارتباط باشید
      </h2>

      <p className="mt-4 leading-8 text-gray-600">
        اگر سوال، پیشنهاد یا انتقادی دارید، تیم ما آماده پاسخگویی به شماست.
      </p>
    </div>
  );
}
