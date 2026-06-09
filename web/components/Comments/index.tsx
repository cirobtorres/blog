import CommentSection from "./CommentSection";

export default function Comments({
  articleId,
  resolvedParams,
}: {
  articleId: string;
  resolvedParams?: { threadId?: string | undefined };
}) {
  return (
    <CommentSection articleId={articleId} resolvedParams={resolvedParams} />
  );
}
