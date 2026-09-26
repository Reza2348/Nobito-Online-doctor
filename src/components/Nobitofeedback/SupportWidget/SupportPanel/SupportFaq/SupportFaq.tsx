"use client";

import { FiChevronLeft, FiHelpCircle, FiUser, FiCpu } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";

const SUPPORT_START_HOUR = 9;
const SUPPORT_END_HOUR = 18;

const faqItems = [
  {
    id: 1,
    question: "چگونه ثبت نام کنم؟",
    type: "signup",
  },
  {
    id: 2,
    question: "چگونه رمز عبورم را تغییر دهم؟",
    type: "ai",
    answer: "در صفحه ورود، گزینه «فراموشی رمز عبور» را انتخاب کنید.",
  },
  {
    id: 3,
    question: "چگونه وضعیت درخواست خود را ببینم؟",
    type: "ai",
    answer:
      "وارد حساب کاربری خود شوید و از بخش «درخواست‌ها» وضعیت درخواستتان را مشاهده کنید.",
  },
  {
    id: 4,
    question: "چگونه با پشتیبان انسانی تماس بگیرم؟",
    type: "human",
  },
] as const;

type Props = {
  onChat: () => void;
  onSignup: () => void;
  onFaqMessage: (question: string, answer: string) => void;
  humanLoading: boolean;
  authLoading: boolean;
};

function isSupportOnline() {
  const hour = new Date().getHours();

  return hour >= SUPPORT_START_HOUR && hour < SUPPORT_END_HOUR;
}

export default function SupportFaq({
  onChat,
  onSignup,
  onFaqMessage,
  humanLoading,
  authLoading,
}: Props) {
  const [isHumanOnline, setIsHumanOnline] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateSupportStatus = () => {
      setIsHumanOnline(isSupportOnline());
      setIsReady(true);
    };

    updateSupportStatus();

    // هر دقیقه وضعیت پشتیبان بررسی می‌شود
    const intervalId = window.setInterval(updateSupportStatus, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const humanDisabled = humanLoading || authLoading;

  const humanAnswer = useMemo(() => {
    if (isHumanOnline) {
      return (
        "پشتیبان انسانی در حال حاضر فعال است. " +
        "برای ارتباط با پشتیبان انسانی، لطفاً درخواست خود را ثبت کنید. " +
        "همکاران ما در اولین فرصت با شما ارتباط برقرار خواهند کرد."
      );
    }

    return (
      "پشتیبان انسانی در حال حاضر غیرفعال است. " +
      "ساعت کاری پشتیبان از ۹ تا ۱۸ است. " +
      "می‌توانید درخواست خود را ثبت کنید؛ " +
      "همکاران ما در اولین فرصت پس از شروع ساعت کاری، " +
      "درخواست شما را بررسی و پاسخ خواهند داد."
    );
  }, [isHumanOnline]);

  const humanStatusText = useMemo(() => {
    if (!isReady) {
      return "در حال بررسی وضعیت پشتیبان...";
    }

    if (authLoading) {
      return "در حال بررسی حساب...";
    }

    if (humanLoading) {
      return "در حال ثبت درخواست...";
    }

    return isHumanOnline
      ? "پشتیبان فعال است · ساعت کاری ۹ تا ۱۸"
      : "پشتیبان غیرفعال است · ساعت کاری ۹ تا ۱۸";
  }, [isReady, authLoading, humanLoading, isHumanOnline]);

  const handleFaqClick = (faq: (typeof faqItems)[number]) => {
    if (faq.type === "signup") {
      onSignup();
      return;
    }

    if (faq.type === "ai") {
      onFaqMessage(faq.question, faq.answer);
      return;
    }

    if (faq.type === "human") {
      onFaqMessage(faq.question, humanAnswer);
    }
  };

  const handleHumanSupportClick = () => {
    onFaqMessage("تماس با پشتیبان انسانی", humanAnswer);
  };

  return (
    <div dir="rtl" className="flex-1 overflow-y-auto p-5">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#1F7168]/10 text-[#1F7168]">
          <FiHelpCircle size={30} aria-hidden="true" />
        </div>

        <h3 className="text-lg font-bold text-gray-800">
          چطور می‌توانیم کمکتان کنیم؟
        </h3>

        <p className="mt-2 text-xs leading-6 text-gray-400">
          سؤال خود را انتخاب کنید یا با دستیار هوشمند گفتگو کنید.
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-2.5">
        {faqItems.map((faq) => {
          const isHumanFaq = faq.type === "human";

          return (
            <button
              key={faq.id}
              type="button"
              disabled={isHumanFaq && humanDisabled}
              onClick={() => handleFaqClick(faq)}
              aria-label={faq.question}
              className="
                group
                w-full
                rounded-2xl
                border border-gray-100
                bg-gray-50
                p-4
                text-right
                transition-all
                hover:bg-[#1F7168]/5
                focus:outline-none
                focus:ring-2
                focus:ring-[#1F7168]/20
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm leading-6 text-gray-700">
                  {faq.question}
                </span>

                <FiChevronLeft
                  size={17}
                  aria-hidden="true"
                  className="
                    shrink-0
                    text-gray-400
                    transition-colors
                    group-hover:text-[#1F7168]
                  "
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* AI Chat */}
      <button
        type="button"
        onClick={onChat}
        aria-label="گفتگو با دستیار هوشمند"
        className="
          mt-4
          w-full
          rounded-2xl
          bg-[#1F7168]
          p-4
          text-white
          transition-all
          hover:bg-[#185f58]
          focus:outline-none
          focus:ring-2
          focus:ring-[#1F7168]/30
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <FiCpu size={20} aria-hidden="true" />
          </div>

          <div className="flex-1 text-right">
            <p className="text-sm font-bold">گفتگو با دستیار هوشمند</p>

            <p className="mt-1 text-[11px] text-white/70">
              سؤال خود را مستقیم بپرسید
            </p>
          </div>
        </div>
      </button>

      {/* Human Support */}
      <button
        type="button"
        disabled={humanDisabled}
        onClick={handleHumanSupportClick}
        aria-label="تماس با پشتیبان انسانی"
        className="
          mt-3
          w-full
          rounded-2xl
          border border-gray-200
          p-4
          text-gray-700
          transition-all
          hover:border-[#1F7168]/30
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2
          focus:ring-[#1F7168]/20
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[#1F7168]">
            <FiUser size={20} aria-hidden="true" />
          </div>

          <div className="flex-1 text-right">
            <p className="text-sm font-bold">تماس با پشتیبان انسانی</p>

            <p className="mt-1 text-[11px] text-gray-400">{humanStatusText}</p>
          </div>

          <FiChevronLeft
            size={18}
            aria-hidden="true"
            className="shrink-0 text-gray-400"
          />
        </div>
      </button>
    </div>
  );
}
