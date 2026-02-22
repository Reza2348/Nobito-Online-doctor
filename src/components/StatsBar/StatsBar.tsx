"use client";

const stats = [
  { value: "+۱۵٬۰۰۰", label: "مراکز درمانی" },
  { value: "+۴۰٬۰۰۰", label: "نوبت دهی روزانه" },
  { value: "+۱۰٬۰۰۰", label: "درمانگر سیار" },
  { value: "+۳۵٬۰۰۰", label: "پزشک آماده به خدمت" },
];

export default function StatsSection() {
  return (
    <div
      dir="rtl"
      className="relative bg-gray-50 overflow-hidden mt-10 mb-10"
      style={{ fontFamily: "'Vazirmatn', 'Tahoma', sans-serif" }}
    >
      {/* Top diagonal ribbon */}
      <div
        className="w-full h-5"
        style={{
          background: "#2d7a6a",
          clipPath: "polygon(0 0, 100% 0, 96% 100%, 4% 100%)",
        }}
      />

      {/* Stats */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-start gap-1 px-4">
              <span className="text-2xl md:text-3xl font-bold text-gray-800">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom diagonal ribbon */}
      <div
        className="w-full h-5"
        style={{
          background: "#2d7a6a",
          clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}
