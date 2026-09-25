import { Article } from "@/Types/types";
import ArticleCard from "@/components/SecondBanner/Articles/ArticleCard/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import LoadMoreButton from "@/components/SecondBanner/Articles/Loadmorebutton/Loadmorebutton";

type Props = {
  articles: Article[];
};

export default function ArticlesList({ articles }: Props) {
  const { loading, loadingMore, loadMore } = useArticles();
  return (
    <div className="space-y-5">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      <div className="mt-6 flex items-center justify-center">
        <LoadMoreButton loading={loadingMore} onClick={loadMore} />
      </div>
    </div>
  );
}
