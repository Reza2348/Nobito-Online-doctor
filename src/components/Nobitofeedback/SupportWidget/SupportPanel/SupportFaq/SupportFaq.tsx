import { FiChevronLeft, FiHelpCircle } from "react-icons/fi";

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
  },
  {
    id: 3,
    question: "چگونه وضعیت درخواست خود را ببینم؟",
    type: "ai",
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
};

export default function SupportFaq({ onChat, onSignup }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-5">
      <div className="text-center mb-6">
        <div
          className="
          w-16 h-16 mx-auto rounded-3xl
          bg-[#1F7168]/10 text-[#1F7168]
          flex items-center justify-center mb-4
        "
        >
          <FiHelpCircle size={30} />
        </div>

        <h3 className="text-lg font-bold text-gray-800">
          چطور می‌توانیم کمکتان کنیم؟
        </h3>

        <p className="text-xs text-gray-400 mt-2 leading-6">
          سؤال خود را انتخاب کنید یا با دستیار هوشمند گفتگو کنید.
        </p>
      </div>

      <div className="space-y-2.5">
        {faqItems.map((faq) => (
          <button
            key={faq.id}
            type="button"
            onClick={() => {
              if (faq.type === "signup") {
                onSignup();
              } else {
                onChat();
              }
            }}
            className="
              w-full text-right p-4
              rounded-2xl border border-gray-100
              bg-gray-50
              hover:bg-[#1F7168]/5
              transition-all group
            "
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-gray-700 leading-6">
                {faq.question}
              </span>

              <FiChevronLeft
                size={17}
                className="text-gray-400 group-hover:text-[#1F7168]"
              />
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onChat}
        className="
          w-full mt-4 p-4
          rounded-2xl bg-[#1F7168]
          text-white hover:bg-[#185f58]
        "
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <FiHelpCircle size={20} />
          </div>

          <div className="text-right flex-1">
            <p className="text-sm font-bold">گفتگو با دستیار هوشمند</p>

            <p className="text-[11px] text-white/70 mt-1">
              سؤال خود را مستقیم بپرسید
            </p>
          </div>

          <FiChevronLeft size={18} />
        </div>
      </button>
    </div>
  );
}
