"use client";

interface ProfessionalDescriptionProps {
  title: string;
  isClinic: boolean;
  bio: string;
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ProfessionalDescription({
  title,
  isClinic,
  bio,
  description,
  onChange,
}: ProfessionalDescriptionProps) {
  const fieldName = isClinic ? "description" : "bio";
  const fieldValue = isClinic ? description : bio;

  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {isClinic ? "توضیحات" : "درباره"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {isClinic
            ? "توضیحات و معرفی کوتاهی درباره کلینیک وارد کنید."
            : `توضیحاتی درباره ${title} بنویسید.`}
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor={`professional-${fieldName}`}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {isClinic ? "توضیحات کلینیک" : `درباره ${title}`}
        </label>

        <textarea
          id={`professional-${fieldName}`}
          name={fieldName}
          value={fieldValue}
          onChange={onChange}
          rows={6}
          maxLength={1000}
          placeholder={
            isClinic
              ? "توضیحات کلینیک را وارد کنید..."
              : `توضیحاتی درباره ${title} وارد کنید...`
          }
          className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm leading-7 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
        />

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">حداکثر ۱۰۰۰ کاراکتر</p>

          <p className="text-xs text-gray-400">{fieldValue.length} / 1000</p>
        </div>
      </div>
    </section>
  );
}
