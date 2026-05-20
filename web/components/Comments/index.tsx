import CommentSection from "./CommentSection";

export default function Comments({ articleId }: { articleId: string }) {
  return <CommentSection articleId={articleId} />;
}
