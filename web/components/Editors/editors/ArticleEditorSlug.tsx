"use client";

import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn, focusRing } from "../../../utils/variants";
import { useArticleStore } from "../../../zustand-store/article-state";
import { serverFetch } from "../../../services/auth-fetch-actions";
import { apiServerUrls } from "../../../routing/routes";
import Spinner from "../../Spinner";

export default function ArticleEditorSlug({
  error,
  ...props
}: React.ComponentProps<"input"> & {
  error?: boolean;
}) {
  const { title, slug, setSlug } = useArticleStore();
  const [isChecking, setIsChecking] = React.useState(false);
  const [isSlugTaken, setIsSlugTaken] = React.useState<
    "valid" | "invalid" | "empty"
  >("empty");

  const validateSlug = useDebouncedCallback(async (currentSlug: string) => {
    if (!currentSlug || currentSlug.length < 5) {
      return;
    }

    setIsChecking(true);
    try {
      const response = await serverFetch(
        `${apiServerUrls.article.slug}/${currentSlug}`,
      );
      setIsSlugTaken(response.ok ? "invalid" : "valid"); // !ok (404) = expected
    } catch (err) {
      if (slug) {
        setIsSlugTaken("invalid");
      } else {
        setIsSlugTaken("empty");
      }
    } finally {
      setIsChecking(false);
    }
  }, 2000);

  const setValidateSlug = React.useCallback(
    (title: string) => {
      if (title.length < 5) {
        setIsSlugTaken("empty");
      }
      validateSlug(title);
    },
    [validateSlug],
  );

  React.useEffect(() => {
    setSlug(title);
    setValidateSlug(title);
  }, [title, setSlug, setValidateSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSlug(val);
    setValidateSlug(val);
  };

  const isSlugValid = !!slug && !!(isSlugTaken === "invalid");

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
          onChange={handleChange}
          className={cn(
            "w-full p-2 pr-9 text-sm border outline-none outline-transparent appearance-none rounded transition-shadow duration-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-600",
            focusRing,
            isSlugValid
              ? "border-emerald-500 dark:border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/10 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-500"
              : error
                ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50"
                : "bg-stone-200 dark:bg-stone-900",
          )}
          {...props}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-0.5 size-8 flex justify-center items-center">
          {isChecking ? (
            <Spinner />
          ) : isSlugTaken === "valid" ? (
            <span className="text-destructive">
              <UnvalidIcon />
            </span>
          ) : isSlugValid ? (
            <span className="text-emerald-500">
              <ValidIcon />
            </span>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}

const ValidIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const UnvalidIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
