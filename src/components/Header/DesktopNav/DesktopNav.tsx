"use client";

import { useEffect, useRef, useState } from "react";
import * as H from "@/Imports/HeaderImports/HeaderImports";

const DesktopNav: H.React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-8 text-gray-700 relative overflow-visible">
      <H.Link href="/" className="hover:text-[#1F7168] font-medium">
        نوبت دهی مطب
      </H.Link>

      {/* DROPDOWN */}
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 hover:text-[#1F7168] font-medium"
        >
          خدمات
          <H.FaChevronDown
            className={`text-sm transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl z-50">
            <H.Link
              href="/dentistry"
              className="block px-4 py-2 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              دندان‌پزشکی
            </H.Link>

            <H.Link
              href="/beauty"
              className="block px-4 py-2 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              زیبایی
            </H.Link>

            <H.Link
              href="/treatment"
              className="block px-4 py-2 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              درمانی
            </H.Link>
          </div>
        )}
      </div>

      <H.Link href="/Onlineconsultation" className="hover:text-[#1F7168]">
        مشاوره آنلاین
      </H.Link>

      <H.Link href="/HealthMagazine" className="hover:text-[#1F7168]">
        مجله سلامت
      </H.Link>

      <H.Link href="/Charity" className="hover:text-[#1F7168]">
        نیکوکاری
      </H.Link>
    </nav>
  );
};

export default DesktopNav;
