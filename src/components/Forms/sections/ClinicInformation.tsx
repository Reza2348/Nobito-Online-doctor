"use client";

import type { ChangeEvent } from "react";
import type { ProfessionalFormData } from "@/Types/types";

interface ClinicInformationProps {
  formData: ProfessionalFormData;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export default function ClinicInformation({
  formData,
  onChange,
}: ClinicInformationProps) {
  return (
    <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">اطلاعات کلینیک</h2>

        <p className="mt-1 text-sm text-gray-500">
          اطلاعات اصلی کلینیک را وارد کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Clinic Name */}
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-black"
          >
            نام کلینیک <span className="text-red-500">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            placeholder="مثلاً کلینیک تخصصی آرمان"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Clinic Type */}
        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            نوع کلینیک
          </label>

          <input
            id="type"
            name="type"
            type="text"
            value={formData.type}
            onChange={onChange}
            placeholder="مثلاً کلینیک پوست و مو"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Specialty */}
        <div>
          <label
            htmlFor="specialty"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            تخصص / حوزه فعالیت
          </label>

          <input
            id="specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={onChange}
            placeholder="مثلاً پوست، مو و زیبایی"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            شماره تماس <span className="text-red-500">*</span>
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            value={formData.phone}
            onChange={onChange}
            placeholder="09123456789"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ایمیل
          </label>

          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            value={formData.email}
            onChange={onChange}
            placeholder="info@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Website */}
        <div className="md:col-span-2">
          <label
            htmlFor="website"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            وب‌سایت
          </label>

          <input
            id="website"
            name="website"
            type="url"
            dir="ltr"
            value={formData.website}
            onChange={onChange}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            آدرس <span className="text-red-500">*</span>
          </label>

          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={onChange}
            placeholder="آدرس کامل کلینیک"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            شهر <span className="text-red-500">*</span>
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={onChange}
            placeholder="مثلاً تهران"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Consultation Type */}
        <div>
          <label
            htmlFor="consultationType"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            نوع ارائه خدمات
          </label>

          <select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="online">آنلاین</option>
            <option value="in_person">حضوری</option>
            <option value="both">حضوری و آنلاین</option>
          </select>
        </div>
      </div>
    </section>
  );
}
