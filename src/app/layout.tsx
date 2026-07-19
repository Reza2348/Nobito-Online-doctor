// app/layout.tsx

import type { Metadata } from "next";
import { IRANSansWebLocal } from "../fonts/IRANSansWeb";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import AppProviders from "@/components/providers/AppProviders";

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
          <AppProviders>
            <Header />
            <main>{children}</main>
            <Footer />
          </AppProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
