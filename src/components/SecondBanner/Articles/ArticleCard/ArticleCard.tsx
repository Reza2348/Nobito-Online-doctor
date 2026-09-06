import { Article } from "@/Types/types";
import { FiArrowLeft, FiClock, FiEye } from "react-icons/fi";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      {/* Content */}
      <div className="flex flex-col sm:flex-row-reverse sm:gap-5 sm:p-5">
        {/* Image */}
        <div className="order-1 relative h-48 w-full shrink-0 overflow-hidden rounded-t-xl sm:order-2 sm:h-36 sm:w-56 sm:rounded-lg">
          {article.photo_url ? (
            <img
              src={article.photo_url}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400">
              تصویر موجود نیست
            </div>
          )}
        </div>

        {/* Text */}
        <div className="order-2 flex-1 px-4 py-4 sm:order-1 sm:px-0 sm:py-0">
          <h2 className="mb-2 text-lg font-bold leading-8 text-gray-800 sm:text-xl">
            {article.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-7 text-gray-500 sm:leading-8">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <FiClock className="shrink-0" />
            {article.reading_time} دقیقه
          </span>

          <span className="flex items-center gap-1.5">
            <FiEye className="shrink-0" />
            {article.views}
          </span>
        </div>

        {/* Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#1F7168] px-4 py-2 text-sm font-medium text-[#1F7168] transition hover:bg-[#1F7168] hover:text-white sm:w-auto"
        >
          ادامه مطلب
          <FiArrowLeft />
        </button>
      </div>
    </article>
  );
}
