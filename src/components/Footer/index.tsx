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
    <footer className="relative mt-24 overflow-hidden bg-surface text-gray-600 py-10 md:py-14">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* FOOTER CARD */}
        <div className="rounded-xl border border-line bg-white p-6 md:p-10">
          {/* BRAND */}
          <div className="mb-10 rounded-xl bg-surface border border-emerald-100 px-5 py-4">
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
          <div className="mt-10 rounded-xl border border-line empty:hidden">
            <F.FooterContact />
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 rounded-xl bg-brand px-5 py-5 text-white shadow-sm">
          <F.FooterBottom />
        </div>
      </div>
    </footer>
  );
}
