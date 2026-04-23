"use client";

import React from "react";
import type { HTMLAttributes } from "react";
import { motion, useAnimation } from "motion/react";
import { useDebouncedCallback } from "use-debounce";
import { cn, focusRing } from "../../../utils/variants";
import { useArticleStore } from "../../../zustand-store/article-state";
import { fetchAction } from "../../../services/auth-fetch-actions";
import { apiServerUrls } from "../../../routing/routes";
import { slugify } from "../../../utils/strings-transforms";
import Spinner from "../../Spinner";

export default function ArticleEditorSlug({
  defaultVal,
  error,
  ...props
}: React.ComponentProps<"input"> & { defaultVal?: string; error?: boolean }) {
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
      const response = await fetchAction(
        apiServerUrls.article.slug + "/" + currentSlug,
      );
      setIsSlugTaken(response.ok ? "invalid" : "valid");
    } catch (e) {
      console.error("ArticleEditorSlug error (useDebouncedCallback):", e);
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
    setSlug(slugify(title));
    setValidateSlug(slugify(title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = slugify(e.target.value);
    setSlug(val);
    setValidateSlug(val);
  };

  const isSlugValid = !!slug && !!(isSlugTaken === "valid");

  React.useEffect(() => {
    if (defaultVal) {
      setSlug(defaultVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              : !!(isSlugTaken === "invalid") || error
                ? "border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive dark:focus-visible:border-destructive"
                : "bg-stone-200 dark:bg-stone-900",
          )}
          {...props}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-0.5 size-8 flex justify-center items-center">
          {isChecking ? (
            <Spinner />
          ) : isSlugTaken === "invalid" ? (
            <span className="text-destructive">
              <XIcon size={20} />
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

// CheckIcon

interface CheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CheckIcon = React.forwardRef<CheckIconHandle, CheckIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);

    React.useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    return (
      <div className={cn(className)} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M4 12 9 17L20 6"
            initial="initial"
            animate="animate"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              animate: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          />
        </svg>
      </div>
    );
  },
);

CheckIcon.displayName = "CheckIcon";

// XIcon

interface XIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface XIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const XIcon = React.forwardRef<XIconHandle, XIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = React.useRef(false);

    React.useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    return (
      <div className={cn(className)} {...props}>
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M18 6 6 18"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="m6 6 12 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </svg>
      </div>
    );
  },
);

XIcon.displayName = "XIcon";
