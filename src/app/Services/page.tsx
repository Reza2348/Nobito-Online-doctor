import { redirect } from "next/navigation";

/** صفحهٔ خدمات در `/ServiceHome` است؛ این مسیر فقط به آن هدایت می‌کند. */
export default function ServicesPage() {
  redirect("/ServiceHome");
}
