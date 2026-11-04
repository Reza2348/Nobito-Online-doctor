import * as F from "@/Imports/FooterImports/FooterImports";
import { SITE_CONTACT } from "@/constants/site";

export default function FooterContact() {
  const { phones, email, address } = SITE_CONTACT;

  if (phones.length === 0 && !email && address.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-right">
      {phones.length > 0 && (
        <div className="flex items-start gap-3 text-gray-700">
          <F.TbPhoneCall size={20} className="text-brand" />
          <span className="text-sm font-medium">
            تماس با پشتیبانی: {phones.join(" | ")}
          </span>
        </div>
      )}

      {email && (
        <div className="flex items-start gap-3 text-gray-700">
          <F.CiMail size={20} className="text-brand" />
          <span className="text-sm font-medium">ایمیل: {email}</span>
        </div>
      )}

      {address.length > 0 && (
        <div className="flex items-start gap-3 text-gray-700">
          <F.FaRegBuilding size={20} className="text-brand" />
          <span className="text-sm leading-6">نشانی: {address.join("، ")}</span>
        </div>
      )}
    </div>
  );
}
