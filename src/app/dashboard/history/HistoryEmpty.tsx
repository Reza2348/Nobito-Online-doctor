const HistoryEmpty = () => {
  return (
    <div className="flex min-h-62.5 items-center justify-center text-center">
      <div>
        <div aria-hidden="true" className="mb-4 text-4xl">
          📋
        </div>

        <h2 className="text-base font-bold text-gray-500">
          نوبتی برای نمایش وجود ندارد
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          در این بخش هنوز سابقه‌ای ثبت نشده است.
        </p>
      </div>
    </div>
  );
};

export default HistoryEmpty;
