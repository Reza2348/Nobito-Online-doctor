/**
 * طول کد تأیید. باید با طول کد در تنظیمات Auth سوپابیس
 * (Authentication → Providers → Email → OTP Length) و با OTP_LENGTH بک‌اند یکی باشد.
 * مقدار پیش‌فرض ۸ است؛ مقدار مجاز ۶ تا ۸.
 */
const parsed = Number(process.env.NEXT_PUBLIC_OTP_LENGTH);

export const OTP_LENGTH =
  Number.isInteger(parsed) && parsed >= 6 && parsed <= 8 ? parsed : 8;
