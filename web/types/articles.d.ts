type Article = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  author: Author;
  media: ArticleBanner;
  tags: Tag[];
  body: string;
  status: ArticleStatus;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

type ArticleCreate = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  authorId: string;
  bannerUrl: string;
  status: ArticleStatus;
  createdAt: string;
};

type ArticleSave = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  authorId: string;
  bannerUrl?: string;
  status: "DRAFT";
  createdAt: string;
};

type ArticleStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";
