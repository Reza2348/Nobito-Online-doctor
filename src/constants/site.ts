/**
 * اطلاعات تماس و شبکه‌های اجتماعی از env خوانده می‌شود تا شماره و آدرس
 * ساختگی در سایت واقعی نمایش داده نشود. بخشی که مقدار نداشته باشد نمایش داده نمی‌شود.
 */
const list = (value: string | undefined) =>
  (value ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

export const SITE_CONTACT = {
  phones: list(process.env.NEXT_PUBLIC_SUPPORT_PHONES),
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "",
  address: list(process.env.NEXT_PUBLIC_OFFICE_ADDRESS),
};

export const SITE_SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim() || "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || "",
};
