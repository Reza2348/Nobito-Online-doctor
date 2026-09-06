import type { ProfessionalType } from "@/Types/types";

/**
 * نام جدول‌های Supabase برای هر نوع متخصص
 */
export const PROFESSIONAL_TABLES: Record<ProfessionalType, string> = {
  doctor: "doctors",
  consultant: "consultants",
  clinic: "clinics",
};

/**
 * عنوان فرم برای هر نوع متخصص
 */
export const PROFESSIONAL_TITLES: Record<ProfessionalType, string> = {
  doctor: "افزودن پزشک",
  consultant: "افزودن مشاور",
  clinic: "افزودن کلینیک",
};

/**
 * عنوان عمومی برای نمایش در بخش‌های مختلف فرم
 */
export const PROFESSIONAL_LABELS: Record<ProfessionalType, string> = {
  doctor: "پزشک",
  consultant: "مشاور",
  clinic: "کلینیک",
};

/**
 * مسیر Storage برای عکس هر نوع متخصص
 */
export const PROFESSIONAL_STORAGE_PATHS: Record<ProfessionalType, string> = {
  doctor: "doctors",
  consultant: "consultants",
  clinic: "clinics",
};

/**
 * تنظیمات مربوط به عکس
 */
export const PROFESSIONAL_PHOTO_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB

  allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const,

  accepted: "image/jpeg,image/jpg,image/png,image/webp",
};

/**
 * پیام‌های فرم
 */
export const PROFESSIONAL_MESSAGES = {
  validation: {
    requiredFirstName: "نام الزامی است.",
    requiredLastName: "نام خانوادگی الزامی است.",
    requiredSpecialty: "تخصص الزامی است.",
    requiredName: "نام کلینیک الزامی است.",
    requiredPhone: "شماره تماس الزامی است.",
    requiredAddress: "آدرس الزامی است.",
    requiredCity: "شهر الزامی است.",
  },

  photo: {
    invalidType: "فرمت عکس مجاز نیست. فقط JPG، PNG و WebP قابل استفاده هستند.",

    tooLarge: "حجم عکس نباید بیشتر از 5 مگابایت باشد.",

    uploadError: "آپلود عکس با خطا مواجه شد.",

    deleteError: "حذف عکس با خطا مواجه شد.",
  },

  submit: {
    success: "اطلاعات با موفقیت ثبت شد.",

    error: "ثبت اطلاعات با خطا مواجه شد.",

    noData: "اطلاعات ثبت شد اما داده‌ای از سرور دریافت نشد.",
  },
} as const;

/**
 * مقادیر پیش‌فرض فرم
 */
export const PROFESSIONAL_FORM_DEFAULTS = {
  consultationType: "online" as const,
  isActive: true,
};

/**
 * Regex های مورد استفاده در اعتبارسنجی
 */
export const PROFESSIONAL_VALIDATION = {
  phone: /^09\d{9}$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  website: /^https?:\/\/.+/i,
} as const;

/**
 * حداکثر طول فیلدهای فرم
 */
export const PROFESSIONAL_FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  name: 200,
  specialty: 200,
  type: 200,
  services: 2000,
  phone: 20,
  email: 255,
  address: 500,
  city: 100,
  website: 500,
  experience: 50,
  bio: 5000,
  description: 5000,
} as const;
