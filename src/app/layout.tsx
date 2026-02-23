"use client";

import { vazirmatnLocal } from "../fonts/vazirmatn";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import { DoctorProvider } from "@/context/DoctorContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <QueryProvider>
          <DoctorProvider>
            <Header />
            {children}
            <link rel="icon" href="/logo1.svg" />
            <title>پزشک آنلاین نوبیتو</title>
            <Footer />
          </DoctorProvider>
        </QueryProvider>

        {/* این دو خط باید در <head> باشند، نه داخل <body> */}
        {/* <link rel="icon" href="/logo1.svg" /> */}
        {/* <title>پزشک آنلاین نوبیتو</title> */}
      </body>
    </html>
  );
}
