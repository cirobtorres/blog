import { cn, hoverRing } from "../../../utils/variants";
import { focusWithinRing } from "../utils";

export function ArticleEditorTitle({
  error,
  ...props
}: FieldsetTextareaProps & {
  error?: string[] | undefined;
}) {
  return (
    <fieldset
      className={cn(
        "relative p-2 pt-6 pr-1 flex flex-col rounded-sm transition-all duration-300 border bg-stone-200 dark:bg-stone-900 not-dark:shadow",
        error &&
          error?.length > 0 &&
          "border-destructive bg-linear-to-r from-destructive/30 to-destructive/10",
        hoverRing,
        focusWithinRing,
      )}
    >
      <textarea
        {...props}
        id="article-title-input"
        name="articleTitle"
        autoFocus
        rows={2}
        maxLength={128}
        spellCheck={false}
        placeholder=""
        className="resize-none text-sm rounded transition-all outline-none border-none bg-none peer scrollbar"
      />
      <label
        id="article-title-label"
        htmlFor="article-title-input"
        className={cn(
          "absolute origin-left select-none pointer-events-none font-medium pl-3 top-6 transform transition-top duration-100 left-0 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-x-0 -translate-y-5 peer-focus:-translate-y-5 peer-placeholder-shown:translate-y-0 translate-x-0 peer-focus:translate-x-0 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100",
          error
            ? "text-neutral-900 dark:text-neutral-100"
            : "text-neutral-500 peer-placeholder-shown:text-neutral-900 dark:peer-placeholder-shown:text-neutral-100",
        )}
      >
        Título do Artigo
      </label>
    </fieldset>
  );
}
