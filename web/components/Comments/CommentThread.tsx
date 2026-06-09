"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "../../utils/variants";
import { Link } from "../Links";
import CommentItem from "./CommentItem";

export default function CommentThread({
  articleId,
  comment,
  depth,
  maxDepth = 3,
}: ThreadProps) {
  const searchParams = useSearchParams();
  const activeThreadId = searchParams.get("threadId");
  const currentDepth = activeThreadId === comment.id ? 0 : depth; // The main thread, whose id is mapped to the URL, has its visual padding reset to 0

  const hasReplies = comment.replies && comment.replies.length > 0;

  const isTooDeep = currentDepth >= maxDepth;

  const createThreadUrl = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("threadId", id);
    return `?${params.toString()}#comment-${id}`;
  };

  return (
    <div
      id={`comment-${comment.id}`}
      className={cn(
        "flex flex-col gap-1",
        currentDepth > 0 &&
          "ml-4 border-l pl-4 border-stone-200 dark:border-stone-800",
      )}
    >
      <CommentItem
        articleId={articleId}
        comment={comment}
        depth={currentDepth}
      />

      {hasReplies && !isTooDeep && (
        <div className="flex flex-col gap-4">
          {comment.replies!.map((reply) => (
            <CommentThread
              articleId={articleId}
              key={reply.id}
              comment={reply}
              depth={currentDepth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}

      {/* Isolate the thread if it gets too deep */}
      {((isTooDeep && hasReplies) ||
        (comment._count && comment._count.children > 0 && isTooDeep)) && (
        <Link
          href={createThreadUrl(comment.id)}
          variant="button"
          className="w-full max-w-50 mx-auto h-8 text-primary/75 dark:text-primary/75 hover:text-primary dark:hover:text-primary"
        >
          Ver mais respostas...
        </Link>
      )}
    </div>
  );
}
