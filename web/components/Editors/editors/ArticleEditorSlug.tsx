"use client";

import React from "react";
import { cn, focusRing } from "../../../utils/variants";
import { useArticleStore } from "../../../zustand-store/article-state";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function ArticleEditorSlug({
  error,
  ...props
}: React.ComponentProps<"input"> & {
  error?: boolean;
}) {
  const { title, slug, setSlug } = useArticleStore();

  const [, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      // Generate unique slug
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return defaultState;
    },
    defaultState,
  );

  React.useEffect(() => {
    setSlug(title);
  }, [title, setSlug]);

  return (
    <fieldset className="flex flex-col">
      <label
        id="article-slug-label"
        htmlFor="article-slug-input"
        className="text-neutral-600 dark:text-neutral-500 font-medium mb-2"
      >
        Slug
      </label>
      <div className="relative">
        <input
          id="article-slug-input"
          type="text"
          placeholder="Slug"
          name="slug"
          autoComplete="off"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={cn(
            "w-full p-2 pr-9 text-sm border outline-none outline-transparent appearance-none rounded transition-shadow duration-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-600",
            focusRing,
            error
              ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50"
              : "bg-stone-200 dark:bg-stone-900",
          )}
          {...props}
        />
        <button
          type="submit"
          disabled={isPending}
          formAction={action}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-0.5 size-8 flex justify-center items-center border border-transparent rounded transition-all duration-300",
            isPending ? "cursor-auto opacity-50" : "cursor-pointer",
            focusRing,
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "size-4 stroke-neutral-500",
              isPending && "animate-spin",
            )}
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>
    </fieldset>
  );
}
