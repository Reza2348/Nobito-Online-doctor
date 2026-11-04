"use client";

import * as C from "@/Imports/Contact usImports/ContactusImports";

import ContactHeader from "@/components/Contact/ContactHeader/ContactHeader";
import ContactForm from "@/components/Contact/ContactForm/ContactForm";
import ContactImage from "@/components/Contact/ContactImage/ContactImage";

export default function Contact() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-surface py-16 md:py-24"
    >
      {/* Background decoration */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* Form */}
          <div className="order-1 w-full space-y-6 md:w-1/2">
            <ContactHeader />
            <ContactForm />
          </div>

          {/* Image */}
          <ContactImage />
        </div>
      </div>

      <C.Socialnetwork />

      <C.ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
