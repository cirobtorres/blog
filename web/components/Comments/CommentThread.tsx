import { cn } from "../../utils/variants";
import { Link } from "../Links";
import CommentItem from "./CommentItem";

export default function CommentThread({
  articleId,
  comment,
  depth,
  maxDepth = 5,
}: ThreadProps) {
  const hasReplies = comment.replies && comment.replies.length > 0;
  const isTooDeep = depth >= maxDepth;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        depth > 0 &&
          "ml-4 border-l pl-4 border-stone-200 dark:border-stone-800",
      )}
    >
      <CommentItem articleId={articleId} comment={comment} depth={depth} />

      {hasReplies && !isTooDeep && (
        <div className="flex flex-col gap-4">
          {comment.replies!.map((reply) => (
            <CommentThread
              articleId={articleId}
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}

      {/* Go to a dedicated page if thread is too long or too deep */}
      {isTooDeep && comment._count && comment._count.children > 0 && (
        <Link
          href={`/comments/${comment.id}`}
          className="text-sm text-primary hover:underline ml-4"
        >
          Ver mais respostas...
        </Link>
      )}
    </div>
  );
}
