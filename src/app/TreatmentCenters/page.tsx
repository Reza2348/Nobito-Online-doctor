import { redirect } from "next/navigation";

/** مراکز درمانی واقعی در صفحهٔ کلینیک‌ها هستند. */
export default function TreatmentCentersPage() {
  redirect("/clinics");
}
