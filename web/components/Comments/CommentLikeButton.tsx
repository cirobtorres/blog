"use client";

import React from "react";
import { cn, focusRing } from "../../utils/variants";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import { toggleCommentLike } from "../../services/commentLike/toggleCommentLike";
import { useDebouncedCallback } from "use-debounce";

export default function CommentLikeButton({
  comment,
  isSignedIn,
  currentPath,
  returnParams,
  size = 24,
}: {
  comment: Comments;
  isSignedIn: boolean;
  currentPath: string;
  returnParams: URLSearchParams;
  size?: number;
}) {
  const likeHash = `comment-like-${comment.id}`;
  const [liked, setLiked] = React.useState<boolean>(
    Boolean(comment.likedByCurrentUser),
  );
  const [isHighlightedLike, setIsHighlightedLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState<number>(
    comment.likeCount ?? 0,
  );
  const initialLikedRef = React.useRef(Boolean(comment.likedByCurrentUser));

  React.useEffect(() => {
    const checkHash = () => {
      if (typeof window === "undefined") return;

      const isTargetHash = window.location.hash === `#${likeHash}`;

      if (isTargetHash) {
        queueMicrotask(() => {
          setIsHighlightedLike(true);
        });

        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      } else {
        queueMicrotask(() => {
          setIsHighlightedLike(false);
        });
      }
    };

    checkHash();

    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [likeHash]);

  const debouncedToggleLike = useDebouncedCallback(
    async (targetLikedState: boolean) => {
      // Click state = server state: user toggled his like/dislike quickly
      if (targetLikedState === initialLikedRef.current) return;

      const result = await toggleCommentLike({ commentId: comment.id });

      if (!result.ok || !result.data) {
        // Rollback
        setLiked(initialLikedRef.current);
        setLikeCount(comment.likeCount ?? 0);
      } else {
        // Success: match with server
        initialLikedRef.current = result.data.liked;
        setLiked(result.data.liked);
        setLikeCount(result.data.likeCount);
      }
    },
    400,
  );

  const handleLikeOrDislike = async () => {
    if (!isSignedIn) {
      const callbackUrl = `${window.location.origin}${currentPath}?${returnParams.toString()}#${likeHash}`;
      await signIn("keycloak", { callbackUrl });
      return;
    }

    setIsHighlightedLike(false);

    // Optimistic update
    const nextLiked = !liked;
    const nextCount = nextLiked ? likeCount + 1 : Math.max(0, likeCount - 1);

    setLiked(nextLiked);
    setLikeCount(nextCount);

    debouncedToggleLike(nextLiked);
  };

  return (
    <span className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
      <Button
        id={likeHash}
        type="button"
        variant="ghost"
        onClick={handleLikeOrDislike}
        className={cn(
          "rounded-full size-8 [&_svg]:text-neutral-900 dark:[&_svg]:text-neutral-100 opacity-100",
          isHighlightedLike &&
            "bg-primary/20 ring-2 ring-primary/40 [&_svg]:text-primary dark:[&_svg]:text-primary animate-pulse-primary",
          focusRing,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            liked ? "stroke-primary fill-primary" : "stroke-current fill-none",
          )}
        >
          <path d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" />
        </svg>
      </Button>
      {likeCount}
    </span>
  );
}
