import type { Metadata } from "next";
import ConsultantProfilePage from "@/app/Consultants-Profile/page";

export const metadata: Metadata = {
  title: "پروفایل مشاور | Nobito",
  description:
    "مشاهده اطلاعات مشاور، تخصص، زمینه‌های فعالیت، سوابق و اطلاعات خدمات مشاوره در Nobito.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConsultantsPage() {
  return <ConsultantProfilePage />;
}
