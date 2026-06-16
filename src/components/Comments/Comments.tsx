"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CiFaceSmile, CiFaceFrown } from "react-icons/ci";
import { LuClock3 } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import type { Comment } from "@/Types/types";
import { FaChevronDown } from "react-icons/fa";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase.from("Comments").select("*");

    if (error) {
      console.log("Supabase Error:", error);
    } else {
      setComments(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-[tahoma] px-2 md:px-0">
      {comments.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-gray-300 rounded-[28px] overflow-hidden shadow-sm"
        >
          <div className="p-5 md:p-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={item.photo_url || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-sm md:text-base font-bold text-[#4a4a4a]">
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 mt-1">
                    {item.date}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto gap-3 md:gap-4">
                <button className="w-full md:w-auto border border-teal-600 text-teal-700 rounded-full px-4 py-2 text-xs md:text-sm hover:bg-teal-50 transition">
                  نوبت آنلاین
                </button>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 text-xl md:text-2xl">
                    {item.rating}
                  </span>
                  <FaStar className="text-amber-400" size={18} />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="mt-5 md:mt-6 text-sm md:text-[18px] font-medium text-gray-600 leading-7">
              {item.text}
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-300 px-5 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            {/* RECOMMENDATION */}
            <div
              className={`flex items-center gap-2 ${
                item.rating < 3 ? "text-[#C71A1A]" : "text-teal-700"
              }`}
            >
              {item.rating < 3 ? (
                <CiFaceFrown size={22} />
              ) : (
                <CiFaceSmile size={22} />
              )}

              <span className="font-medium text-sm md:text-base">
                این پزشک را پیشنهاد می‌کنم
              </span>
            </div>

            {/* WAIT TIME */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <LuClock3 size={18} />
              <span>زمان انتظار : ۱۵۰۰ دقیقه</span>
            </div>
          </div>
        </div>
      ))}
      <button className="border border-black text-black w-full rounded-md py-2 flex items-center justify-center gap-2">
        مشاهده بیشتر
        <FaChevronDown />
      </button>
    </div>
  );
};

export default Comments;
