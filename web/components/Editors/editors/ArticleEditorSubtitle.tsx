"use client";

import { cn, focusWithinRing } from "../../../utils/variants";
import { useArticleStore } from "../../../zustand-store/article-state";

export function ArticleEditorSubtitle({
  error,
  ...props
}: FieldsetTextareaProps & {
  error?: string[] | undefined;
}) {
  const { subtitle, setSubtitle } = useArticleStore();

  return (
    <fieldset className="flex flex-col">
      <label
        id="article-subtitle-label"
        htmlFor="article-subtitle-input"
        className="text-neutral-600 dark:text-neutral-500 font-medium mb-2"
      >
        Subtítulo do Artigo
      </label>
      <textarea
        id="article-subtitle-input"
        name="subtitle"
        rows={2}
        maxLength={256}
        spellCheck={false}
        placeholder="Subtítulo"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className={cn(
          "resize-none p-2 text-sm outline-none border not-dark:shadow placeholder:text-neutral-700 dark:placeholder:text-neutral-600 bg-stone-200 dark:bg-stone-900 rounded-sm transition-shadow duration-300 peer scrollbar",
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
