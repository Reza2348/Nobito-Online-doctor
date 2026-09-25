import { FiSend } from "react-icons/fi";

type Props = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function ChatInput({
  value,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          disabled={loading}
          className="
            flex-1 h-11 px-4
            rounded-xl bg-gray-50
            border border-gray-200
            text-sm text-gray-700
            outline-none
            focus:border-[#1F7168]
            focus:ring-2 focus:ring-[#1F7168]/10
            disabled:opacity-50
          "
        />

        <button
          type="submit"
          disabled={!value.trim() || loading}
          aria-label="ارسال پیام"
          className="
            w-11 h-11 rounded-xl
            bg-[#1F7168] text-white
            flex items-center justify-center
            disabled:opacity-40
          "
        >
          <FiSend size={18} className="rotate-180" />
        </button>
      </form>
    </div>
  );
}
