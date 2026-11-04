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
        className="rounded-md border border-brand px-6 py-2 text-sm text-brand transition hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "در حال بارگذاری..." : "مشاهده بیشتر"}
      </button>
    </div>
  );
}
