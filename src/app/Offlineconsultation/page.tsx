import React from "react";
import { FaClipboardList, FaUserMd, FaVideo } from "react-icons/fa";

const OnlineConsultationTimeline = () => {
  const steps = [
    {
      icon: <FaClipboardList className="w-8 h-8 text-blue-600" />,
      title: "ثبت درخواست",
      description: "مشخصات خود را وارد کرده و وقت مشاوره را رزرو کنید.",
    },
    {
      icon: <FaUserMd className="w-8 h-8 text-green-600" />,
      title: "انتخاب پزشک",
      description: "پزشک متخصص خود را بر اساس نیازتان انتخاب کنید.",
    },
    {
      icon: <FaVideo className="w-8 h-8 text-purple-600" />,
      title: "مشاوره آنلاین",
      description: "از طریق تماس ویدیویی یا چت، مشاوره دریافت کنید.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          مشاوره غیرحضوری با پزشکان متخصص
        </h2>
        <p className="text-gray-600">
          مراحل ساده و سریع برای دریافت مشاوره آنلاین، بدون نیاز به مراجعه
          حضوری.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row md:justify-between items-center max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center text-center mb-12 md:mb-0 relative"
          >
            {/* آیکون */}
            <div className="bg-white p-4 rounded-full shadow-lg z-10 mb-4">
              {step.icon}
            </div>

            {/* عنوان و توضیح */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
          رزرو مشاوره آنلاین
        </button>
      </div>
    </section>
  );
};

export default OnlineConsultationTimeline;
