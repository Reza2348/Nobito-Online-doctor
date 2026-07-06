import { Article } from "@/Types/types";
import { FiArrowLeft, FiClock, FiEye } from "react-icons/fi";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex flex-col-reverse gap-4 sm:flex-row-reverse">
        <div className="flex-1">
          <h2 className="mb-2 px-1 text-lg font-bold text-gray-800 sm:text-xl">
            {article.title}
          </h2>

          <p className="line-clamp-3 px-1 text-sm leading-7 text-gray-500 sm:leading-8">
            {article.excerpt}
          </p>
        </div>

        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-36 sm:w-56">
          {article.photo_url ? (
            <img
              src={article.photo_url}
              alt={article.title}
              className="w-2xl"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              تصویر موجود نیست
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <div className="flex gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FiClock />
            {article.reading_time} دقیقه
          </span>

          <span className="flex items-center gap-1">
            <FiEye />
            {article.views}
          </span>
        </div>

        <button className="flex items-center gap-2 rounded-md border border-[#1F7168] px-4 py-1.5 text-sm text-[#1F7168] transition hover:bg-[#1F7168] hover:text-white">
          <FiArrowLeft />
          ادامه مطلب
        </button>
      </div>
    </article>
  );
}
