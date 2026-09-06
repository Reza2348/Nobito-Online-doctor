"use client";

interface ProfessionalLocationProps {
  formData: {
    city: string;
    address: string;
  };
  isClinic: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ProfessionalLocation({
  formData,
  isClinic,
  onChange,
}: ProfessionalLocationProps) {
  return (
    <section
      dir="rtl"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">آدرس</h3>

        <p className="mt-1 text-sm text-gray-500">
          موقعیت و آدرس محل ارائه خدمات را وارد کنید.
        </p>
      </div>

      {/* Location fields */}
      <div className="space-y-5">
        {/* City */}
        {isClinic && (
          <div>
            <label
              htmlFor="professional-city"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              شهر
            </label>

            <input
              id="professional-city"
              name="city"
              type="text"
              value={formData.city}
              onChange={onChange}
              autoComplete="address-level2"
              placeholder="مثلاً تهران"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        )}

        {/* Address */}
        <div>
          <label
            htmlFor="professional-address"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            آدرس کامل
          </label>

          <textarea
            id="professional-address"
            name="address"
            value={formData.address}
            onChange={onChange}
            rows={4}
            maxLength={500}
            autoComplete="street-address"
            placeholder="استان، شهر، خیابان، کوچه، پلاک و واحد..."
            className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-sm leading-7 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />

          {/* Character counter */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">آدرس دقیق محل را وارد کنید.</p>

            <p className="text-xs text-gray-400">
              {formData.address.length} / 500
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
