import type { Metadata } from "next";
import DoctorProfile from "@/app/doctor-profile/page";

export const metadata: Metadata = {
  title: "پروفایل پزشک | Nobito",
  description:
    "مشاهده اطلاعات پزشک، تخصص، سوابق، خدمات، نظرات بیماران و امکان دریافت نوبت پزشکی در Nobito.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function DoctorsPage() {
  return <DoctorProfile />;
}
