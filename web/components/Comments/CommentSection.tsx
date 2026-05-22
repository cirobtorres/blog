import CommentThread from "./CommentThread";
import getComments from "../../services/comment/getComments";
import { Button } from "../Button";
import CommentEditor from "./CommentEditor";

export default async function CommentSection({
  articleId,
}: {
  articleId: string;
}) {
  const comments = await getComments({
    articleId,
    page: "0",
    limit: "20",
    repliesLimit: "5",
  });

  const { content, page } = comments.data;
  const hasMore = page.number + 1 < page.totalPages;

  return (
    <section id="comments" className="w-full my-10 flex flex-col gap-8">
      <div className="w-full h-30 mx-auto flex flex-col justify-center items-center border-y bg-stone-200 dark:bg-stone-900">
        <h2 className="text-3xl">Comentários {page.totalPages}</h2>
      </div>

      <div className="w-full max-w-comments mx-auto px-6 my-6">
        <CommentEditor articleId={articleId} />
      </div>

      <div className="w-full max-w-comments mx-auto px-6 my-6 flex flex-col gap-8">
        {content.map((comment: Comments) => (
          <CommentThread
            key={comment.id}
            articleId={articleId}
            comment={comment}
            depth={0}
          />
        ))}

        {hasMore && (
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
