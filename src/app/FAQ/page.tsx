"use client";

import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { FAQItem } from "@/Types/types";
import { medicalFAQs } from "@/app/FAQ/faqData";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white" dir="rtl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">سوالات متداول</h2>
        <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-4">
        {medicalFAQs.map((faq: FAQItem, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`group border rounded-2xl transition-all duration-300 ${
                isOpen
                  ? "border-emerald-200 bg-emerald-50/30 shadow-sm"
                  : "border-gray-200 bg-white hover:border-emerald-300"
              }`}
            >
              {/* بخش سوال - همیشه نمایش داده می‌شود */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-right focus:outline-none"
              >
                <span
                  className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                    isOpen ? "text-emerald-700" : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>

                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isOpen
                      ? "bg-emerald-500 text-white rotate-180"
                      : "bg-gray-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-500"
                  }`}
                >
                  <FaChevronDown size={14} />
                </div>
              </button>

              {/* بخش جواب - انیمیشن ارتفاع */}
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                style={{
                  maxHeight: isOpen
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
                }}
                className="transition-all duration-500 ease-in-out overflow-hidden"
              >
                <div className="px-5 pb-6 text-gray-600 text-sm md:text-base leading-7 border-t border-emerald-100/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
