type Tag = {
  id: string;
  name: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
};

type PageableTag = {
  content: Tag[];
  page: Pagination;
};
