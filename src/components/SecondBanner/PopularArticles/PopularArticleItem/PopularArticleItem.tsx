import { FiClock } from "react-icons/fi";
import { PopularArticle } from "@/Types/types";

type Props = {
  article: PopularArticle;
};

export default function PopularArticleItem({ article }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm transition hover:shadow-md">
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-black">
          {article.title}
        </h3>

        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
          {article.excerpt}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
          <FiClock size={12} />
          {article.reading_time} دقیقه
        </div>
      </div>

      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
        {article.photo_url ? (
          <img
            src={article.photo_url}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px]">
            بدون تصویر
          </div>
        )}
      </div>
    </div>
  );
}
