// app/layout.tsx

import type { Metadata } from "next";
import { IRANSansWebLocal } from "../fonts/IRANSansWeb";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { DoctorProvider } from "@/context/DoctorContext/DoctorContext";
import { ConsultantProvider } from "@/context/ConsultantsContext/ConsultantsContext";
import { ClinicsProvider } from "@/context/ClinicsContext/ClinicsContext";

export const metadata: Metadata = {
  title: "پزشک آنلاین نوبیتو",
  icons: {
    icon: "/logo1.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${IRANSansWebLocal.className} antialiased`}>
        <QueryProvider>
          <ClinicsProvider>
            <ConsultantProvider>
              <DoctorProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </DoctorProvider>
            </ConsultantProvider>
          </ClinicsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
