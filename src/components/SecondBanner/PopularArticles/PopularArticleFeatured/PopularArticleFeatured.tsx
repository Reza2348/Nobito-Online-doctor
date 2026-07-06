import { FiClock } from "react-icons/fi";
import { PopularArticle } from "@/Types/types";

type Props = {
  article: PopularArticle;
};

export default function PopularArticleFeatured({ article }: Props) {
  return (
    <div className="rounded-xl bg-[#1F7168] p-4 text-white shadow">
      <h3 className="mb-2 line-clamp-2 text-base font-bold">{article.title}</h3>

      <p className="mb-3 line-clamp-2 text-sm text-white/90">
        {article.excerpt}
      </p>

      <div className="flex items-center gap-1 text-xs">
        <FiClock size={13} />
        {article.reading_time} دقیقه مطالعه
      </div>
    </div>
  );
}
