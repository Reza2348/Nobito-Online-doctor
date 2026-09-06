// =========================================================
// ARTICLES
// =========================================================

export type Article = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  views: number;
  published: boolean;
  created_at: string;
};

export type PopularArticle = {
  id: number;
  title: string;
  excerpt: string;
  photo_url: string | null;
  reading_time: number;
  display_order: number;
  published?: boolean;
};
