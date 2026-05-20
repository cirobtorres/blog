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
  isBlocked: boolean;
  blockedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
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
  id: string | null;
  name: string;
  pictureUrl: string | null;
};
