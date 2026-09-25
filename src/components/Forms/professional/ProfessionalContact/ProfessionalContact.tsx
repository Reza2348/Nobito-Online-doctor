"use client";

interface ProfessionalContactProps {
  formData: {
    phone: string;
    email: string;
    website: string;
  };
  isClinic: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfessionalContact({
  formData,
  isClinic,
  onChange,
}: ProfessionalContactProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">اطلاعات تماس</h3>

        <p className="mt-1 text-sm text-gray-500">
          اطلاعات تماس حرفه‌ای را وارد کنید.
        </p>
      </div>

      {/* Contact fields */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Phone */}
        <div>
          <label
            htmlFor="professional-phone"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            شماره تماس
          </label>

          <input
            id="professional-phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="professional-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            ایمیل
          </label>

          <input
            id="professional-email"
            name="email"
            value={formData.email}
            onChange={onChange}
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder="example@email.com"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Website */}
        {isClinic && (
          <div className="md:col-span-2">
            <label
              htmlFor="professional-website"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              وب‌سایت
            </label>

            <input
              id="professional-website"
              name="website"
              value={formData.website}
              onChange={onChange}
              type="url"
              inputMode="url"
              autoComplete="url"
              dir="ltr"
              placeholder="https://example.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />

            <p className="mt-2 text-xs text-gray-500">
              آدرس کامل وب‌سایت را همراه با https:// وارد کنید.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
