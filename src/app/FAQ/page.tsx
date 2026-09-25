"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import type { FAQItem } from "@/Types/types";

import { medicalFAQs } from "@/app/FAQ/faqData";
import Socialnetwork from "@/components/Socialnetwork/Socialnetwork";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleFAQ = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <section
      dir="rtl"
      className="
relative
overflow-hidden
py-16
md:py-24
bg-gradient-to-br
from-green-50
via-white
to-blue-50
"
    >
      <div
        className="
absolute
top-0
right-0
w-[450px]
h-[450px]
bg-emerald-200/30
blur-3xl
rounded-full
"
      />

      <div
        className="
relative
max-w-5xl
mx-auto
px-4
sm:px-6
"
      >
        {/* HEADER */}

        <div
          className="
text-center
mb-14
"
        >
          <span
            className="
inline-flex
items-center
rounded-full
bg-emerald-100
px-5
py-2
text-sm
font-medium
text-emerald-700
"
          >
            پشتیبانی سلامت دیجیتال
          </span>

          <h1
            className="
mt-5
text-3xl
md:text-5xl
font-black
text-gray-950
"
          >
            سوالات متداول
          </h1>

          <p
            className="
mt-5
max-w-2xl
mx-auto
text-gray-600
leading-8
"
          >
            پاسخ سوالات رایج درباره خدمات درمانی، نوبت‌دهی و ارتباط با پزشکان.
          </p>
        </div>

        {/* FAQ LIST */}

        <div
          className="
space-y-5
"
        >
          {medicalFAQs.map((faq: FAQItem) => {
            const isOpen = openQuestion === faq.question;

            return (
              <div
                key={faq.question}
                className={`
group
rounded-[28px]
border
backdrop-blur-xl
transition-all
duration-300

${
  isOpen
    ? "bg-white shadow-xl border-emerald-200"
    : "bg-white/70 border-gray-100 hover:border-emerald-300 hover:shadow-lg"
}

`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFAQ(faq.question)}
                  className="
w-full
flex
items-center
justify-between
gap-5
p-5
md:p-7
text-right
"
                >
                  <span
                    className={`
font-bold
text-base
md:text-lg
leading-8
transition-colors

${isOpen ? "text-emerald-700" : "text-gray-900"}

`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`
shrink-0
flex
items-center
justify-center
w-10
h-10
rounded-full
transition-all
duration-300

${
  isOpen
    ? "bg-emerald-600 text-white rotate-180"
    : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
}

`}
                  >
                    <FaChevronDown size={15} />
                  </div>
                </button>

                <div
                  className={`
grid
transition-all
duration-500
ease-in-out

${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}

`}
                >
                  <div
                    className="
overflow-hidden
"
                  >
                    <div
                      className="
px-5
md:px-7
pb-7
pt-2
border-t
border-gray-100
text-gray-600
text-sm
md:text-base
leading-8
"
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRUST BOX */}

        <div
          className="
mt-14
rounded-[32px]
bg-gray-950
p-8
text-center
text-white
shadow-2xl
"
        >
          <h2
            className="
text-xl
md:text-2xl
font-bold
"
          >
            هنوز سوالی دارید؟
          </h2>

          <p
            className="
mt-3
text-gray-300
leading-7
"
          >
            تیم پشتیبانی ما آماده پاسخگویی به شماست.
          </p>
        </div>

        <div className="mt-12">
          <Socialnetwork />
        </div>
      </div>
    </section>
  );
}
