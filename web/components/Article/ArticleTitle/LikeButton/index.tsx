"use client";

import React from "react";
import { cn, focusRing } from "../../../../utils/variants";
import { toggleArticleLike } from "../../../../services/articleLike/toggleArticleLike";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function LikeButton({
  article,
  size = 20,
}: {
  article: Article;
  size?: number;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const isSignedIn = !!user?.id;
  const currentPath = usePathname();
  const likeHash = `article-like-${article.id}`;

  const [liked, setLiked] = React.useState<boolean>(
    Boolean(article.likedByCurrentUser),
  );
  const [isHighlightedLike, setIsHighlightedLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState<number>(
    article.likeCount ?? 0,
  );
  const initialLikedRef = React.useRef(Boolean(article.likedByCurrentUser));

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

      const result = await toggleArticleLike({ articleId: article.id });

      if (!result.ok || !result.data) {
        // Rollback
        setLiked(initialLikedRef.current);
        setLikeCount(article.likeCount ?? 0);
      } else {
        // Success: match with server
        initialLikedRef.current = result.data.liked;
        setLiked(result.data.liked);
        setLikeCount(result.data.likeCount);
      }
    },
    400,
  );

  const handleLikeOrDislike = () => {
    if (!isSignedIn) {
      const callbackUrl = `${window.location.origin}${currentPath}#${likeHash}`;
      signIn("keycloak", { callbackUrl });
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
    <span className="text-sm flex items-center gap-2">
      <button
        id={likeHash}
        type="button"
        onClick={handleLikeOrDislike}
        className={cn(
          "scroll-mt-16 cursor-pointer flex items-center rounded-full p-1 border border-transparent transition-all duration-300",
          isHighlightedLike &&
            "bg-primary/20 [&_svg]:text-primary dark:[&_svg]:text-primary animate-pulse-primary",
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
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      </button>
      {likeCount}
    </span>
  );
}
