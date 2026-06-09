import CommentThread from "./CommentThread";
import getComments from "../../services/comment/getComments";
import CommentHere from "./CommentHere";
import { Button } from "../Button";
import { Link } from "../Links";

function findCommentDeep(
  comments: Comments[],
  targetId: string,
): Comments | null {
  for (const comment of comments) {
    if (comment.id === targetId) return comment;
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentDeep(comment.replies, targetId);
      if (found) return found;
    }
  }
  return null;
}

export default async function CommentSection({
  articleId,
  resolvedParams,
}: {
  articleId: string;
  resolvedParams?: { threadId?: string | undefined };
}) {
  const activeThreadId = resolvedParams?.threadId;
  const comments = await getComments({
    articleId,
    page: "0",
    limit: "20",
    repliesLimit: "5",
  });

  const { content, page } = comments.data;
  const hasMore = page.number + 1 < page.totalPages;

  let displayComments: Comments[] = content;
  let targetComment: Comments | null = null;

  if (activeThreadId) {
    targetComment = findCommentDeep(content, activeThreadId);
    displayComments = targetComment ? [targetComment] : [];
  }

  const getParentThreadUrl = () => {
    if (!targetComment) return "#comments";
    if (!targetComment.parentId) return `?#comment-${targetComment.id}`;
    return `?threadId=${targetComment.parentId}#comment-${targetComment.id}`;
  };

  const getRootThreadUrl = () => {
    if (activeThreadId) {
      return `?#comment-${activeThreadId}`;
    }
    return "?#comments";
  };

  return (
    <section id="comments" className="w-full my-10 flex flex-col gap-8">
      <div className="w-full h-30 mx-auto flex flex-col justify-center items-center border-y bg-stone-200 dark:bg-stone-900">
        <h2 className="text-3xl">Comentários {page.totalElements}</h2>
      </div>

      {activeThreadId && (
        <div className="w-full max-w-comments mx-auto px-6 flex justify-between items-center gap-2 text-sm max-[550px]:flex-col">
          <Link
            href={getParentThreadUrl()}
            variant="button"
            className="w-full max-w-64 mx-auto h-8 text-primary/75 dark:text-primary/75 hover:text-primary dark:hover:text-primary"
          >
            ← Voltar conversa
          </Link>
          <Link
            href={getRootThreadUrl()}
            variant="button"
            className="w-full max-w-64 mx-auto h-8"
          >
            Voltar para raiz
          </Link>
        </div>
      )}

      {!activeThreadId && <CommentHere articleId={articleId} />}

      <div className="w-full max-w-comments mx-auto px-6 my-6 flex flex-col gap-8">
        {displayComments.length > 0
          ? displayComments.map((comment: Comments) => (
              <CommentThread
                key={comment.id}
                articleId={articleId}
                comment={comment}
                depth={0}
                maxDepth={3}
              />
            ))
          : activeThreadId && (
              <p className="text-center text-neutral-500 text-sm">
                Comentário não encontrado ou indisponível.
              </p>
            )}

        {!activeThreadId && hasMore && (
          <Button
            variant="ghost"
            className="w-full max-w-30 h-7.5 rounded-full mx-auto"
          >
            Carregar mais
          </Button>
        )}
      </div>
    </section>
  );
}
