import { default as Image } from "next/image";

const Page = () => {
  return (
    <div className="w-auto bg-[#1F7168] flex items-center justify-center py-4 my-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        <Image src="/Pic (4).svg" alt="Pic" width={60} height={60} />

        <Image src="/Pic (3).svg" alt="Pic" width={60} height={60} />

        <Image src="/Pic (2).svg" alt="Pic" width={60} height={60} />

        <Image src="/Pic (1).svg" alt="Pic" width={60} height={60} />

        <Image src="/Pic.svg" alt="Pic" width={60} height={60} />
      </div>
    </div>
  );
};

export default Page;
