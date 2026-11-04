import { redirect } from "next/navigation";

/** فهرست نسخه‌ها در «پرونده پزشکی» نمایش داده می‌شود (با اعتبارسنجی نشست). */
export default function PrescriptionsPage() {
  redirect("/dashboard/Medicalrecord");
}
