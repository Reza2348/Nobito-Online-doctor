import { vazirmatnLocal } from "../fonts/vazirmatn";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/components/QueryProvider/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
          <link rel="icon" href="/logo1.svg" />
          <title>پزشک آنلاین نوبیتو</title>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
