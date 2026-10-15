type PageableComments = {
  content: Comments[];
  page: Pagination;
};

type Comments = {
  id: string;
  body: string; // Tiptap JSON
  article: CommentArticle;
  user: UserComment;
  likeCount: number;
  likedByCurrentUser: boolean;
  parentId?: string;
  replies?: Comments[];
  isBlocked: boolean;
  blockedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  editedAt: string | null;
  deletedAt: string | null;
  isDeleted: boolean;
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
  userId: string;
  articleId: string;
  body: string;
  articlePath: string;
};
