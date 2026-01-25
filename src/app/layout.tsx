import { vazirmatnLocal } from "../fonts/vazirmatn";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatnLocal.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
