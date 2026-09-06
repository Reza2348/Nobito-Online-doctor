"use client";

import type { ChangeEvent } from "react";
import type { ProfessionalFormData } from "@/Types/types";

interface ClinicServicesProps {
  formData: ProfessionalFormData;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export default function ClinicServices({
  formData,
  onChange,
}: ClinicServicesProps) {
  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-black">خدمات کلینیک</h2>

        <p className="mt-1 text-sm text-gray-500">
          خدماتی که کلینیک ارائه می‌دهد را وارد کنید.
        </p>
      </div>

      <div>
        <label
          htmlFor="services"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          خدمات
        </label>

        <textarea
          id="services"
          name="services"
          value={formData.services}
          onChange={onChange}
          rows={5}
          placeholder={`مثلاً:
لیزر موهای زائد
جوانسازی پوست
تزریق بوتاکس
تزریق فیلر
میکرونیدلینگ`}
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-7 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-gray-500">
          هر خدمت را در یک خط جداگانه وارد کنید.
        </p>
      </div>
    </section>
  );
}
