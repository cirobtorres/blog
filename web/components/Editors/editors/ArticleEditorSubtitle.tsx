"use client";

import React from "react";
import { cn, focusWithinRing } from "../../../utils/variants";
import { SentenceCounter } from "./utils";
import { useArticleStore } from "../../../providers/ArticleStoreProvider";

export function ArticleEditorSubtitle({
  defaultVal,
  error,
  ...props
}: FieldsetTextareaProps & {
  defaultVal?: string;
  error?: boolean;
}) {
  const { subtitle, setSubtitle } = useArticleStore();

  React.useEffect(() => {
    if (defaultVal) {
      setSubtitle(defaultVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        placeholder={"Subtítulo"}
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className={cn(
          "resize-none p-2 text-sm outline-none border not-dark:shadow placeholder:text-neutral-700 dark:placeholder:text-neutral-600 rounded-sm transition-shadow duration-300 peer scrollbar",
          focusWithinRing,
          error
            ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive dark:focus-visible:border-destructive"
            : "border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-900",
        )}
        {...props}
      />
      <SentenceCounter sentence={subtitle} />
    </fieldset>
  );
}
