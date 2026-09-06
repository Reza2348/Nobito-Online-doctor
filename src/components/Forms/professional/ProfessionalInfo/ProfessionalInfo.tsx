"use client";

interface ProfessionalInfoProps {
  formData: {
    specialty: string;
    experience: string;
    consultationType: "online" | "in_person" | "both";
  };
  isConsultant: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function ProfessionalInfo({
  formData,
  isConsultant,
  onChange,
}: ProfessionalInfoProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">اطلاعات حرفه‌ای</h3>

        <p className="mt-1 text-sm text-gray-500">
          تخصص و اطلاعات حرفه‌ای را وارد کنید.
        </p>
      </div>

      {/* Professional information */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Specialty */}
        <div>
          <label
            htmlFor="professional-specialty"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            تخصص
          </label>

          <input
            id="professional-specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={onChange}
            autoComplete="off"
            placeholder="مثلاً متخصص قلب و عروق"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="professional-experience"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            سابقه فعالیت
          </label>

          <input
            id="professional-experience"
            name="experience"
            type="text"
            value={formData.experience}
            onChange={onChange}
            placeholder="مثلاً ۱۰ سال"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Consultation Type */}
        {isConsultant && (
          <div className="md:col-span-2">
            <label
              htmlFor="professional-consultation-type"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              نوع مشاوره
            </label>

            <select
              id="professional-consultation-type"
              name="consultationType"
              value={formData.consultationType}
              onChange={onChange}
              className="w-full cursor-pointer appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            >
              <option value="online">آنلاین</option>
              <option value="in_person">حضوری</option>
              <option value="both">آنلاین و حضوری</option>
            </select>

            <p className="mt-2 text-xs text-gray-500">
              روش ارائه خدمات مشاوره را انتخاب کنید.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
