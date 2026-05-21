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
  parentId?: string;
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

type CommentSave = {
  commentId?: string;
  parentId?: string;
  identityId: string;
  articleId: string;
  body: string;
  articlePath: string;
};
