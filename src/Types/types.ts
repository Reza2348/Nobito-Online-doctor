// types.ts

// کاربر
export interface User {
  id: string;
  username: string;
  email: string;
}

// لینک‌های ناوبری
export interface NavLink {
  href: string;
  label: string;
}

// لینک‌های فوتر
export interface FooterLink {
  name: string;
  href: string;
  badge?: string;
  external?: boolean;
}

// بخش‌های فوتر شامل عنوان و لینک‌ها
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// تایپ فرم ثبت نام
export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
