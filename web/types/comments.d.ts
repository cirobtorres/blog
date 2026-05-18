type PageableComments = {
  content: Comments[];
  page: Pagination;
};

type Comments = {
  id: string;
  body: string; // JSON do Tiptap
  article: CommentArticle;
  user: UserComment;
  likeCount: number;
  createdAt: string;
  parentId: string | null;
  replies?: Comments[];
  _count?: {
    children: number;
  };
};

type ThreadProps = {
  articleId: string;
  comment: Comments;
  depth: number;
  maxDepth?: number;
};

type CommentArticle = {
  id: string;
};

type UserComment = {
  id: string;
  name: string;
  pictureUrl: string;
};
