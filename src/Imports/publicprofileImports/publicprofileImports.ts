// src/Imports/publicprofileImports/publicprofileImports.ts
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form"; // توجه: SubmitHandler نوع است
import type { FormData } from "@/Types/types"; // type جداگانه

// کامپوننت‌ها و توابع معمولی
export { FaChevronDown, FaChevronLeft, React, useForm };

// typeها باید با export type صادر شوند
export type { FormData, SubmitHandler };
