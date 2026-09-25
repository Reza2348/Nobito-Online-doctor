import { z } from "zod";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const irPhoneRegex = /^(?:0|98|\+98)?9\d{9}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "لطفا ایمیل یا شماره موبایل خود را وارد کنید")
    .refine(
      (value) =>
        emailRegex.test(value) || irPhoneRegex.test(value.replace(/\s/g, "")),
      "لطفا ایمیل یا شماره موبایل معتبر وارد کنید",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
