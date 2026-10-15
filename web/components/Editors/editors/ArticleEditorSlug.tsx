"use client";

import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { apiServerUrls } from "../../../routing/routes";
import { slugify, slugifyWhileTyping } from "../../../utils/strings-transforms";
import { fetchAction } from "../../../services/fetchAction";
import { useArticleStore } from "../../../providers/ArticleStoreProvider";
import { cn } from "../../../utils/variants";
import CloseIcon from "../../icons/animated/CloseIcon";
import CheckIcon from "../../icons/animated/CheckIcon";
import Spinner from "../../Spinner";

const DEBOUNCE_DURATION = 2000; // ms

export default function ArticleEditorSlug({
  articleId,
  defaultVal,
  error,
  ...props
}: React.ComponentProps<"input"> & {
  articleId?: string;
  defaultVal?: string;
  error?: boolean;
}) {
  const { slug, isSlugTaken, setSlug, setIsSlugTaken } = useArticleStore();
  const [isChecking, setIsChecking] = React.useState(false);
  const requestIdRef = React.useRef(0);

  const validateSlug = useDebouncedCallback(async (rawSlug: string) => {
    const currentSlug = slugify(rawSlug);
    if (!currentSlug || currentSlug.length < 5) {
      setIsSlugTaken("empty");
      return;
    }

    const requestId = requestIdRef.current;

    setIsChecking(true);

    try {
      const isArticleEdit = articleId ? "?excludeId=" + articleId : "";
      const URI = apiServerUrls.article.slug.concat(
        "/",
        currentSlug,
        "/check",
        isArticleEdit,
      );
      const response = await fetchAction(URI);

      // The slug has changed while request was in flight: discard it
      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        setIsSlugTaken("empty");
        return;
      }

      const data: { available: boolean } = response.data;

      setIsSlugTaken(data.available ? "valid" : "invalid");
    } catch (e) {
      console.error("ArticleEditorSlug error (useDebouncedCallback):", e);
      setIsSlugTaken("empty");
    } finally {
      if (requestId === requestIdRef.current) setIsChecking(false);
    }
  }, DEBOUNCE_DURATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(slugifyWhileTyping(e.target.value));
    setIsSlugTaken("empty");
  };

  React.useEffect(() => {
    requestIdRef.current += 1;
    React.startTransition(() => {
      setIsChecking(false);
    });
    validateSlug(slug);
  }, [slug, validateSlug]);

  React.useEffect(() => {
    if (defaultVal) {
      setSlug(slugify(defaultVal));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasContent = slug.length > 0;
  const hasMinLength = slug.length >= 5;
  const isServerValid = isSlugTaken === "valid";
  const isSlugValid = hasContent && hasMinLength && isServerValid;
  const hasError = isSlugTaken === "invalid" || error;

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
            "w-full p-2 pr-9 text-sm border outline-none outline-transparent appearance-none rounded not-dark:shadow transition-shadow duration-300 placeholder:text-neutral-700 dark:placeholder:text-neutral-600 focus-visible:outline-none dark:focus-visible:outline-none focus-visible:ring-2 dark:focus-visible:ring-2 dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-950",
            isSlugValid
              ? "focus-visible:ring-success border-success dark:border-success bg-success/10 dark:bg-success/10 focus-visible:border-success dark:focus-visible:border-success"
              : hasError
                ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:ring-destructive focus-visible:border-destructive dark:focus-visible:border-destructive"
                : "focus-visible:ring-primary focus-visible:border-primary dark:focus-visible:border-primary border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-900",
          )}
          {...props}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-0.5 size-8 flex justify-center items-center">
          {isChecking ? (
            <Spinner />
          ) : isSlugTaken === "invalid" ? (
            <span className="text-destructive">
              <CloseIcon size={20} />
            </span>
          ) : isSlugValid ? (
            <span className="text-emerald-500">
              <CheckIcon size={20} />
            </span>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}
