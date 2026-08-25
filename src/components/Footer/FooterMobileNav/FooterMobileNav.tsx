"use client";
import React from "react";
import { FOOTER_NAV } from "@/components/Footer/footer data/footer.data";
import MobileSection from "@/components/Footer/MobileSection/MobileSection";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";
type Props = { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void };
export default function FooterMobileNav({ onSubmit }: Props) {
  return (
    <footer
      dir="rtl"
      aria-label="پاورقی سایت"
      className=" mx-4 my-6 overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm md:hidden "
    >
      {" "}
      {/* ======================================== FOOTER NAVIGATION ======================================== */}{" "}
      <nav
        aria-label="لینک‌های پاورقی"
        className=" divide-y divide-slate-100 px-4 "
      >
        {" "}
        {FOOTER_NAV.map((section) => (
          <MobileSection key={section.title} {...section} />
        ))}{" "}
      </nav>{" "}
      {/* ======================================== NEWSLETTER ======================================== */}{" "}
      <div className=" border-t border-slate-100 px-4 py-5 ">
        {" "}
        <Newsletter mobile onSubmit={onSubmit} />{" "}
      </div>{" "}
      {/* ======================================== BOTTOM ======================================== */}{" "}
      <div className=" border-t border-slate-100 bg-slate-50/70 px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-center ">
        {" "}
        <p className=" text-xs leading-6 text-slate-500 ">
          {" "}
          © {new Date().getFullYear()} نوبیتو — تمامی حقوق محفوظ است.{" "}
        </p>{" "}
      </div>{" "}
    </footer>
  );
}
