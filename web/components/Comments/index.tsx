import CommentsSection from "./CommentSection";

export default function Comments({ articleId }: { articleId: string }) {
  return <CommentsSection articleId={articleId} />;
}
