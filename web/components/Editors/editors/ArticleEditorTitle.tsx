import { cn, focusWithinRing } from "../../../utils/variants";

export function ArticleEditorTitle({
  error,
  ...props
}: FieldsetTextareaProps & {
  error?: string[] | undefined;
}) {
  return (
    <fieldset className={cn("flex flex-col")}>
      <label
        id="article-title-label"
        htmlFor="article-title-input"
        className="text-neutral-500 peer-placeholder-shown:text-neutral-900 dark:peer-placeholder-shown:text-neutral-100 font-medium mb-2"
      >
        Título do Artigo
      </label>
      <textarea
        {...props}
        id="article-title-input"
        name="articleTitle"
        autoFocus
        rows={2}
        maxLength={128}
        spellCheck={false}
        placeholder=""
        className={cn(
          "resize-none p-2 text-sm outline-none border not-dark:shadow placeholder:text-neutral-700 rounded-sm transition-all duration-300 peer scrollbar",
          focusWithinRing,
          error
            ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50"
            : "bg-stone-200 dark:bg-stone-900",
        )}
      />
    </fieldset>
  );
}
