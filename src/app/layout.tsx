// app/layout.tsx
"use client";

import { vazirmatnLocal } from "../fonts/vazirmatn";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { DoctorProvider } from "@/context/DoctorContext";
import { ConsultantProvider } from "@/context/ConsultantsContext"; // ⚠ نام درست

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>پزشک آنلاین نوبیتو</title>
        <link rel="icon" href="/logo1.svg" />
      </head>
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <QueryProvider>
          <ConsultantProvider>
            <DoctorProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </DoctorProvider>
          </ConsultantProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
