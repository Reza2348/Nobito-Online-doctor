import { FiArrowRight, FiMessageCircle, FiX } from "react-icons/fi";

type Props = {
  view: "faq" | "chat" | "signup";
  onBack: () => void;
  onClose: () => void;
};

export default function SupportHeader({ view, onBack, onClose }: Props) {
  return (
    <header className="bg-[#1F7168] text-white px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {view !== "faq" && (
            <button
              type="button"
              aria-label="بازگشت"
              onClick={onBack}
              className="
                w-9 h-9 rounded-full
                flex items-center justify-center
                hover:bg-white/10
              "
            >
              <FiArrowRight size={19} />
            </button>
          )}

          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
            <FiMessageCircle size={21} />
          </div>

          <div>
            <p className="font-bold text-sm">پشتیبانی نوبیتو</p>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-300" />

              <span className="text-[11px] text-white/80">
                دستیار هوشمند آنلاین
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="بستن"
          onClick={onClose}
          className="
            w-9 h-9 rounded-full
            flex items-center justify-center
            hover:bg-white/10
          "
        >
          <FiX size={21} />
        </button>
      </div>
    </header>
  );
}
