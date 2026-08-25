"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CiFaceSmile, CiFaceFrown } from "react-icons/ci";
import { LuClock3 } from "react-icons/lu";
import { FaStar, FaChevronDown } from "react-icons/fa";
import type { Comment } from "@/Types/types";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase.from("Comments").select("*");

    if (error) {
      console.log(error);
    } else {
      setComments(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div
        className="
        py-10
        text-center
        text-gray-400
        "
      >
        در حال بارگذاری نظرات...
      </div>
    );
  }

  return (
    <section
      dir="rtl"
      className="
      mt-10
      space-y-5
      "
    >
      {comments.map((item) => (
        <article
          key={item.id}
          className="
            overflow-hidden
            rounded-4xl
            border
            border-gray-100
            bg-white
            shadow-[0_12px_35px_rgba(0,0,0,.06)]
            transition-all
            hover:-translate-y-1
            "
        >
          {/* TOP */}

          <div
            className="
              p-6
              "
          >
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                justify-between
                gap-5
                "
            >
              {/* USER */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  "
              >
                <img
                  src={item.photo_url || "/placeholder.jpg"}
                  alt={item.name}
                  className="
                    h-16
                    w-16
                    rounded-3xl
                    object-cover
                    ring-4
                    ring-teal-50
                    "
                />

                <div>
                  <h3
                    className="
                      font-black
                      text-gray-800
                      "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-gray-400
                      "
                  >
                    {item.date}
                  </p>
                </div>
              </div>

              {/* RATING */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-yellow-50
                    px-4
                    py-2
                    "
                >
                  <span
                    className="
                      font-black
                      text-yellow-700
                      "
                  >
                    {item.rating}
                  </span>

                  <FaStar
                    className="
                      text-yellow-400
                      "
                  />
                </div>

                <button
                  className="
                    rounded-full
                    border
                    border-teal-200
                    px-4
                    py-2
                    text-xs
                    font-bold
                    text-teal-700
                    transition
                    hover:bg-teal-50
                    "
                >
                  نوبت آنلاین
                </button>
              </div>
            </div>

            {/* COMMENT */}

            <p
              className="
                mt-6
                text-sm
                md:text-base
                leading-8
                text-gray-600
                "
            >
              {item.text}
            </p>
          </div>

          {/* FOOTER */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-4
              border-t
              border-gray-100
              bg-gray-50/70
              px-6
              py-4
              "
          >
            <div
              className={`
                flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                text-sm
                font-bold
                ${
                  item.rating < 3
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                }
                `}
            >
              {item.rating < 3 ? (
                <CiFaceFrown size={22} />
              ) : (
                <CiFaceSmile size={22} />
              )}
              این پزشک را پیشنهاد می‌کنم
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-4
                py-2
                text-xs
                font-bold
                text-gray-500
                "
            >
              <LuClock3 />
              زمان انتظار: ۱۵۰۰ دقیقه
            </div>
          </div>
        </article>
      ))}

      <button
        className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-teal-600
        py-3
        font-bold
        text-teal-700
        transition-all
        hover:bg-teal-600
        hover:text-white
        "
      >
        مشاهده بیشتر
        <FaChevronDown
          className="
          transition-transform
          group-hover:translate-y-1
          "
        />
      </button>
    </section>
  );
};

export default Comments;
