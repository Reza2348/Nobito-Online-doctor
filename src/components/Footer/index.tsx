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
    <footer className="bg-gray-50 text-gray-600 border-t pt-10">
      <F.FooterTop />
      <F.FooterDesktopNav onSubmit={handleNewsletterSubmit} />
      <F.FooterMobileNav onSubmit={handleNewsletterSubmit} />
      <F.FooterContact />
      <F.FooterBottom />
    </footer>
  );
}
