import * as F from "@/Imports/FooterImports/FooterImports";

export default function FooterContact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
      {/* ستون راست: اطلاعات تماس */}
      <div className="flex flex-col gap-5 text-right w-full md:w-auto">
        <div className="flex items-start gap-3 text-gray-700 group cursor-pointer">
          <F.TbPhoneCall
            size={20}
            className="text-[#1F7168] group-hover:scale-110 transition-transform"
          />
          <span className="font-medium text-sm">
            تماس با پشتیبانی: ۰۲۱-۱۲۳۴۵۶۷۸ | ۰۲۱-۱۲۳۴۵۶۷۸
          </span>
        </div>

        <div className="flex items-start gap-3 text-gray-700 group cursor-pointer">
          <F.CiMail
            size={20}
            className="text-[#1F7168] group-hover:scale-110 transition-transform"
          />
          <span className="font-medium text-sm">
            نشانی پست الکترونیکی: smartix@yahoo.com
          </span>
        </div>

        <div className="flex items-start gap-3 text-gray-700">
          <F.FaRegBuilding size={20} className="text-[#1F7168]" />
          <span className="leading-6 text-sm">
            نشانی: تهران - میدان آرژانتین - خیابان لاله - کوچه صاد - پلاک ۱۸
          </span>
        </div>
      </div>

      {/* ستون چپ: نمادهای اعتماد */}
      <div className="flex flex-col items-center md:items-start gap-5 w-full md:w-auto">
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <F.Image
                src="/"
                width={55}
                height={55}
                alt="نماد اعتماد"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 text-center md:text-right max-w-[380px] leading-6">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. این متن صرفاً جهت پر کردن فضا استفاده شده است.
        </p>
      </div>
    </div>
  );
}
