"use client";

import { cn, focusWithinRing } from "../../../utils/variants";
import { useArticleStore } from "../../../zustand-store/article-state";

export function ArticleEditorTitle({
  error,
  ...props
}: FieldsetTextareaProps & {
  error?: string[] | undefined;
}) {
  const { title, setTitle } = useArticleStore();

  return (
    <fieldset className="flex flex-col">
      <label
        id="article-title-label"
        htmlFor="article-title-input"
        className="text-neutral-600 dark:text-neutral-500 font-medium mb-2"
      >
        Título do Artigo
      </label>
      <textarea
        id="article-title-input"
        name="title"
        autoFocus
        rows={2}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={128}
        spellCheck={false}
        placeholder="Título"
        className={cn(
          "resize-none p-2 text-sm outline-none border not-dark:shadow placeholder:text-neutral-700 dark:placeholder:text-neutral-600 rounded-sm transition-shadow duration-300 peer scrollbar",
          focusWithinRing,
          error
            ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50"
            : "bg-stone-200 dark:bg-stone-900",
        )}
        {...props}
      />
    </fieldset>
  );
}
