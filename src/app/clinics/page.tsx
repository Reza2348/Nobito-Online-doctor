import type { Metadata } from "next";
import ClinicsProfilePage from "@/app/clinics-profile/page";

export const metadata: Metadata = {
  title: "پروفایل کلینیک | Nobito",
  description:
    "مشاهده اطلاعات کلینیک، تخصص‌ها، خدمات و اطلاعات تماس مراکز درمانی در Nobito.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ClinicsPage() {
  return <ClinicsProfilePage />;
}
