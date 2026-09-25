"use client";

interface ProfessionalPersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfessionalPersonalInfo({
  formData,
  onChange,
}: ProfessionalPersonalInfoProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">اطلاعات شخصی</h3>

        <p className="mt-1 text-sm text-gray-500">
          نام و نام خانوادگی خود را وارد کنید.
        </p>
      </div>

      {/* Personal information */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* First name */}
        <div>
          <label
            htmlFor="professional-first-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            نام
          </label>

          <input
            id="professional-first-name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={onChange}
            autoComplete="given-name"
            placeholder="مثلاً علی"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Last name */}
        <div>
          <label
            htmlFor="professional-last-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            نام خانوادگی
          </label>

          <input
            id="professional-last-name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={onChange}
            autoComplete="family-name"
            placeholder="مثلاً رضایی"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>
      </div>
    </section>
  );
}
