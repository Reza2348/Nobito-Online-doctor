"use client";

import React from "react";
import { FaArrowLeft, FaCommentDots } from "react-icons/fa6";

const Userexperience = () => {
  return (
    <section
      dir="rtl"
      className="
      mt-10
      rounded-4xl
      border
      border-gray-100
      bg-white
      p-6
      md:p-8
      shadow-[0_15px_40px_rgba(0,0,0,.06)]
      "
    >
      {/* HEADER */}

      <div
        className="
        flex
        items-center
        gap-3
        mb-6
        "
      >
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-teal-50
          text-teal-600
          "
        >
          <FaCommentDots size={22} />
        </div>

        <div>
          <h2
            className="
            text-xl
            md:text-2xl
            font-black
            text-gray-800
            "
          >
            تجربیات کاربران
          </h2>

          <p
            className="
            mt-1
            text-sm
            text-gray-400
            "
          >
            نظرات واقعی بیماران درباره تجربه درمان
          </p>
        </div>
      </div>

      {/* DESCRIPTION */}

      <div
        className="
        rounded-3xl
        bg-gray-50
        p-5
        leading-8
        text-sm
        text-gray-500
        "
      >
        در ادامه می‌توانید تجربه مراجعه کاربران دیگر به این پزشک را مشاهده کنید.
        اگر شما هم از بیماران این پزشک بوده‌اید، تجربه خود را با دیگران به
        اشتراک بگذارید.
      </div>

      {/* ACTION */}

      <div
        className="
        mt-8
        flex
        justify-end
        "
      >
        <button
          type="button"
          className="
          group
          flex
          items-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-teal-600
          to-emerald-500
          px-6
          py-3
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-teal-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          "
        >
          ثبت بازخورد
          <FaArrowLeft
            className="
            transition-transform
            duration-300
            group-hover:-translate-x-1
            "
            size={16}
          />
        </button>
      </div>
    </section>
  );
};

export default Userexperience;
