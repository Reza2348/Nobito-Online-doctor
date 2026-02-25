import React from "react";
import * as C from "@/Imports/Contact usImports/ContactusImports";

const Page = () => {
  return (
    <div>
      <div className="space-y-16 mt-6">
        {/* شبکه های اجتماعی */}
        <div className="flex flex-col items-center text-2xl space-y-6">
          <p className="text-center text-black">
            ما را در شبکه‌ها اجتماعی دنبال کنید...
          </p>

          <div className="flex gap-12 mt-4">
            <C.PiInstagramLogoLight className="text-[#1F7168] text-3xl" />
            <C.FiPhoneCall className="text-[#1F7168] text-3xl" />
            <C.TbSend className="text-[#1F7168] text-3xl" />
            <C.PiYoutubeLogo className="text-[#1F7168] text-3xl" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6">
          {/* 📞 PHONE */}
          <div className="flex flex-col items-center justify-center border border-black rounded-lg p-4 space-y-2">
            <C.FiPhoneCall className="text-[#1f7168]" />
            <p className="text-black">تماس با پشتیبانی</p>
            <p className="text-black">۱۲۳۴۵۶۷۸-۰۲۱ | ۱۲۳۴۵۶۷۸-۰۲۱</p>
          </div>

          {/* 📧 EMAIL */}
          <div className="flex flex-col items-center justify-center border border-black rounded-lg p-4 space-y-2">
            <C.MdOutlineMailOutline className="text-[#1f7168]" />
            <p className="text-black">smartix@yahoo.com</p>
          </div>

          {/* 📍 LOCATION */}
          <div className="flex flex-col items-center justify-center border border-black rounded-lg p-4 space-y-2">
            <C.IoLocationOutline className="text-[#1f7168]" />
            <p className="text-black">تهران - میدان آرژانتین</p>
            <p className="text-black">خیابان لاله - کوچه صاد - پلاک 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
