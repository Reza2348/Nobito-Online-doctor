"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useConsultant } from "@/context/ConsultantsContext/ConsultantsContext";
import { supabase } from "@/lib/supabaseClient";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type {
  Consultant,
  FeedbackTab,
  ConsultantFeedbackPayload,
  FeedbackOption,
} from "@/Types/types";

// TODO: در صورت نیاز گزینه‌های اختصاصی مشاور رو جایگزین کنید
const feedbackOptions: FeedbackOption[] = [
  "تشخیص درست",
  "رفتار مناسب",
  "زمان انتظار",
  "پاسخگویی",
  "نسخه الکترونیکی",
  "کیفیت مشاوره",
];

const Page: React.FC = () => {
  const router = useRouter();
  const { consultantId } = useConsultant();
  const [consultants, setConsultants] = React.useState<Consultant[]>([]);
  const [rating, setRating] = React.useState<number>(0);
  const [hovered, setHovered] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState<FeedbackTab>("positive");
  const [isWritingComment, setIsWritingComment] =
    React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>("");

  React.useEffect(() => {
    const fetchConsultants = async (): Promise<void> => {
      const { data } = await supabase.from("consultants").select("*");
      if (data) setConsultants(data as Consultant[]);
    };
    fetchConsultants();
  }, []);

  const selectedConsultant: Consultant | undefined = consultants.find(
    (c) => c.id === consultantId,
  );

  const toggleOption = (option: string): void => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setComment(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!selectedConsultant) return;

    const payload: ConsultantFeedbackPayload = {
      consultant_id: selectedConsultant.id,
      rating,
      positive_or_negative: activeTab,
      options: selected,
      comment,
    };

    const { error } = await supabase
      .from("feedbacks_consultants")
      .insert(payload);

    if (error) {
      toast.error("خطا در ثبت بازخورد");
      return;
    }

    toast.success("نظر شما تایید شد");
    setRating(0);
    setSelected([]);
    setComment("");
    setIsWritingComment(false);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-3 px-8 py-6 bg-white rounded-lg shadow-md w-full">
      <ToastContainer position="top-center" rtl />
      {!selectedConsultant ? (
        <p>یک مشاور انتخاب کنید</p>
      ) : (
        <>
          {/* عکس */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={selectedConsultant.photo_url ?? "/placeholder.png"}
              className="w-full h-full object-cover"
              alt={selectedConsultant.name}
            />
          </div>

          {/* اسم */}
          <p className="text-[#121212] font-bold text-lg leading-none">
            {selectedConsultant.name}
          </p>

          {/* تخصص */}
          <p className="text-gray-500 text-sm leading-none">
            {selectedConsultant.specialty}
          </p>

          {/* متن توضیح */}
          <p className="text-[#757575] text-sm text-center">
            کاربر گرامی ضمن آرزوی سلامتی برای شما ؛ لطفا امتیاز خود را نسبت به
            خدمات مشاور {selectedConsultant.name} ثبت
          </p>

          {/* ستاره‌ها */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => {
              const filled = index < (hovered || rating);
              return (
                <FaStar
                  key={index}
                  size={36}
                  className={`cursor-pointer transition-colors ${
                    filled ? "text-amber-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(index + 1)}
                  onMouseEnter={() => setHovered(index + 1)}
                  onMouseLeave={() => setHovered(0)}
                />
              );
            })}
          </div>

          {/* تب‌های نکات قوت / نکات ضعف */}
          <div className="flex w-full border-b border-gray-200">
            <button
              onClick={() => setActiveTab("positive")}
              className={`flex items-center gap-1 flex-1 justify-center pb-2 text-sm font-medium transition-colors ${
                activeTab === "positive"
                  ? "text-[#1F7168] border-b-2 border-[#1F7168]"
                  : "text-gray-400"
              }`}
            >
              <FaThumbsUp size={14} />
              نکات قوت
            </button>
            <button
              onClick={() => setActiveTab("negative")}
              className={`flex items-center gap-1 flex-1 justify-center pb-2 text-sm font-medium transition-colors ${
                activeTab === "negative"
                  ? "text-[#1F7168] border-b-2 border-[#1F7168]"
                  : "text-gray-400"
              }`}
            >
              <FaThumbsDown size={14} />
              نکات ضعف
            </button>
          </div>

          {/* عنوان سوال */}
          <p className="text-[#121212] font-semibold text-sm text-center">
            از کدام موارد رضایت داشته اید؟
          </p>

          {/* دکمه‌های بازخورد */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {feedbackOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`border rounded-full text-xs px-3 py-1.5 transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                  selected.includes(option)
                    ? "bg-teal-600 text-white border-teal-600"
                    : "text-gray-700 border-gray-300 hover:border-teal-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* باکس نوشتن نظر */}
          {isWritingComment && (
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="نظر خود را بنویسید..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-700 resize-none focus:outline-none focus:border-teal-500"
              rows={3}
            />
          )}

          {/* دکمه‌های پایین */}
          <div className="flex gap-3 w-full mt-1">
            <button
              onClick={handleSubmit}
              className="flex-2 bg-[#1F7168] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-teal-700 transition"
            >
              ثبت بازخورد
            </button>
            <button
              onClick={() => setIsWritingComment((prev) => !prev)}
              className="flex-1 border border-gray-300 rounded-lg py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              {isWritingComment ? "بستن" : "نگارش نظر"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
