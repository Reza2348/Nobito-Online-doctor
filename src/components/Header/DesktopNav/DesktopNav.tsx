"use client";

import * as H from "@/Imports/HeaderImports/HeaderImports";

const DesktopNav: H.React.FC = () => {
  return (
    <nav className="hidden md:flex items-center gap-8 text-gray-700">
      <H.Link
        href="/"
        className="text-gray-700 hover:text-[#1F7168] font-medium transition"
      >
        نوبت دهی مطب
      </H.Link>

      <H.Link
        href="/Services"
        className="text-gray-700 hover:text-[#1F7168] font-medium transition"
      >
        خدمات
      </H.Link>

      <H.Link
        href="/Onlineconsultation"
        className="text-gray-700 hover:text-[#1F7168] font-medium transition"
      >
        مشاوره آنلاین
      </H.Link>

      <H.Link
        href="/HealthMagazine"
        className="text-gray-700 hover:text-[#1F7168] font-medium transition"
      >
        مجله سلامت
      </H.Link>

      <H.Link
        href="/Charity"
        className="text-gray-700 hover:text-[#1F7168] font-medium transition"
      >
        نیکوکاری
      </H.Link>
    </nav>
  );
};

export default DesktopNav;
