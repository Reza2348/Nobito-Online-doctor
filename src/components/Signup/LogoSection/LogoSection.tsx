import * as S from "@/Imports/signupImports/signupImports"; // برای Image

export default function LogoSection() {
  return (
    <div className="flex justify-center mb-4">
      <S.Image src="/logo1.svg" alt="logo" width={100} height={100} priority />
    </div>
  );
}
