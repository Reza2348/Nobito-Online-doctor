type LoadMoreButtonProps = {
  onClick: () => void;
  loading: boolean;
};

export default function LoadMoreButton({
  onClick,
  loading,
}: LoadMoreButtonProps) {
  return (
    <div className="mt-6">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-md border border-[#1F7168] px-6 py-2 text-sm text-[#1F7168] transition hover:bg-[#1F7168] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "در حال بارگذاری..." : "مشاهده بیشتر"}
      </button>
    </div>
  );
}
