import CommentEditor from "./CommentEditor";
import CommentHere from "./CommentHere";

export default function Comments() {
  return (
    <div>
      <div className="w-full h-30 mx-auto flex flex-col justify-center items-center border-y bg-stone-200 dark:bg-stone-900">
        <h2 className="text-3xl">Comentários</h2>
      </div>
      <div className="w-full max-w-comments mx-auto px-6 my-6">
        <section id="comments">
          <CommentHere />
          <CommentEditor id="create-comment" name="create-comment" />
        </section>
      </div>
    </div>
  );
}
