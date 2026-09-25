"use client";

import * as F from "@/Imports/FooterImports/FooterImports";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = new FormData(e.currentTarget).get("email");

    console.log(email);

    e.currentTarget.reset();
  };

  return (
    <footer className="relative mt-24 overflow-hidden bg-linear-to-b from-white via-emerald-50/30 to-gray-50 text-gray-600 py-10 md:py-14">
      {/* TOP GLOW */}
      <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* FOOTER CARD */}
        <div className="rounded-[36px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.08)] p-6 md:p-10">
          {/* BRAND */}
          <div className="mb-10 rounded-3xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-5 py-4">
            <F.FooterTop />
          </div>

          {/* NAV */}
          <div className="border-t border-gray-100 pt-8">
            <div className="hidden lg:block">
              <F.FooterDesktopNav onSubmit={handleNewsletterSubmit} />
            </div>

            <div className="lg:hidden">
              <F.FooterMobileNav onSubmit={handleNewsletterSubmit} />
            </div>
          </div>

          {/* CONTACT */}
          <div className="mt-10 rounded-3xl border border-gray-100 bg-gray-50/70 p-5 md:p-6">
            <F.FooterContact />
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 rounded-3xl bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-5 text-white shadow-lg">
          <F.FooterBottom />
        </div>
      </div>
    </footer>
  );
}
