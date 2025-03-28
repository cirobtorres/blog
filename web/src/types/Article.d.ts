type ArticleCard = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  author: Author;
  category: Category;
  subCategories: SubCategory[];
  tags: Tag[];
};

type Article = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  author: Author;
  category: Category;
  subCategories: SubCategory[];
  technologies: Technology[];
  tags: Tag[];
  blocks: ArticleBlocks[];
};

type Cover = {
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
};

type ArticleContent = {
  documentId: string;
  content: ArticleBlocks[];
};
