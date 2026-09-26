"use client";

import React from "react";
import { cn, focusRing } from "../../../utils/variants";
import { toggleArticleLike } from "../../../services/articleLike/toggleArticleLike";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_DURATION = 2000; // ms

export default function ArticleLikeButton({
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
  const [likedByUser, setLikedByUser] = React.useState<boolean>(
    Boolean(article.likedByCurrentUser),
  );
  const [isHighlightedLike, setIsHighlightedLike] = React.useState(false);
  const [fromServer, setFromServer] = React.useState({
    liked: Boolean(article.likedByCurrentUser),
    count: article.likeCount ?? 0,
  });
  const likeCount = Math.max(
    0,
    fromServer.count +
      (likedByUser === fromServer.liked ? 0 : likedByUser ? 1 : -1),
  );
  const likedRef = React.useRef(fromServer.liked);
  const serverRef = React.useRef(fromServer);
  const inFlightRef = React.useRef(false);

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

  const sync = React.useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      // As long as the intention differs from the server's, toggle it
      while (likedRef.current !== serverRef.current.liked) {
        const result = await toggleArticleLike({ articleId: article.id });

        if (!result.ok || !result.data) {
          // Rollback
          likedRef.current = serverRef.current.liked;
          setLikedByUser(serverRef.current.liked);
          return;
        }

        serverRef.current = {
          liked: result.data.liked,
          count: result.data.likeCount,
        };
        setFromServer(serverRef.current);
      }
    } finally {
      inFlightRef.current = false;
    }
  }, [article.id]);

  const debouncedSync = useDebouncedCallback(sync, DEBOUNCE_DURATION);

  const handleLikeOrDislike = () => {
    if (!isSignedIn) {
      const callbackUrl = `${window.location.origin}${currentPath}#${likeHash}`;
      signIn("keycloak", { callbackUrl });
      return;
    }

    setIsHighlightedLike(false);

    const next = !likedRef.current; // Prevents outdated closure (stale closure)
    likedRef.current = next;
    setLikedByUser(next); // Optimistic (visual first, resolve later)

    debouncedSync();
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
            likedByUser
              ? "stroke-primary fill-primary"
              : "stroke-current fill-none",
          )}
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      </button>
      {likeCount}
    </span>
  );
}
