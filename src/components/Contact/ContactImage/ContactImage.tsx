import Image from "next/image";

export default function ContactImage() {
  return (
    <div
      className="
        relative
        order-2
        hidden
        w-full
        md:block
        md:w-1/2
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-xl
          border
          border-white
          shadow-sm
        "
      >
        <Image
          src="/card1.png"
          alt="ارتباط با ما"
          width={700}
          height={700}
          className="w-full object-cover"
        />
      </div>

      <div
        className="
          absolute
          bottom-6
          right-6
          rounded-xl
          bg-white/90
          px-5
          py-4
          shadow-sm
         
        "
      >
        <p className="font-bold text-gray-900">پشتیبانی مطمئن</p>

        <p className="text-sm text-gray-500">همراه شما در مسیر سلامت</p>
      </div>
    </div>
  );
}
