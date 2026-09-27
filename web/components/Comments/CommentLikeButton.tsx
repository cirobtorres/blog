"use client";

import React from "react";
import { cn, focusRing } from "../../utils/variants";
import { Button } from "../Button";
import { signIn } from "next-auth/react";
import { toggleCommentLike } from "../../services/commentLike/toggleCommentLike";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_DURATION = 2000; // ms

// Registro fora do ciclo de vida do React, indexado por commentId. Se a árvore de comentários remontar este componente no meio da janela
// de debounce, a intenção do usuário e o último estado confirmado pelo servidor sobrevivem à remontagem — só o timer do debounce em si é perdido,
// então ao montar de novo nós disparamos a sincronização pendente imediatamente em vez de assumir que "não há nada pendente".
type PendingLikeState = {
  liked: boolean; // Intenção do usuário
  server: { liked: boolean; count: number }; // Último estado confirmado pelo servidor
  inFlight: boolean;
  dirty: boolean; // Existe uma intenção ainda não confirmada pelo servidor?
};

const pendingLikeRegistry = new Map<string, PendingLikeState>();

function getPendingState(
  commentId: string,
  initialLiked: boolean,
  initialCount: number,
): PendingLikeState {
  const existing = pendingLikeRegistry.get(commentId);
  if (existing) return existing;

  const created: PendingLikeState = {
    liked: initialLiked,
    server: { liked: initialLiked, count: initialCount },
    inFlight: false,
    dirty: false,
  };
  pendingLikeRegistry.set(commentId, created);
  return created;
}

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

  // Em vez de sempre reinicializar a partir de `comment`, consultamos primeiro se já existe um estado pendente para este comentário.
  const pending = getPendingState(
    String(comment.id),
    Boolean(comment.likedByCurrentUser),
    comment.likeCount ?? 0,
  );

  const [likedByUser, setLikedByUser] = React.useState<boolean>(pending.liked);
  const [fromServer, setFromServer] = React.useState(pending.server);
  const likeCount = Math.max(
    0,
    fromServer.count +
      (likedByUser === fromServer.liked ? 0 : likedByUser ? 1 : -1),
  );
  const [isHighlightedLike, setIsHighlightedLike] = React.useState(false);

  const likedRef = React.useRef(pending.liked);
  const serverRef = React.useRef(pending.server);
  const inFlightRef = React.useRef(pending.inFlight);

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

  const commentIdKey = String(comment.id);

  const sync = React.useCallback(async () => {
    const state = getPendingState(
      commentIdKey,
      likedRef.current,
      serverRef.current.count,
    );

    if (state.inFlight) return;
    state.inFlight = true;
    inFlightRef.current = true;

    try {
      // Enquanto a intenção divergir do servidor, tenta convergir
      while (likedRef.current !== serverRef.current.liked) {
        try {
          const result = await toggleCommentLike({ commentId: comment.id });

          if (!result.ok || !result.data) {
            // Rollback
            likedRef.current = serverRef.current.liked;
            setLikedByUser(serverRef.current.liked);
            state.liked = serverRef.current.liked;
            state.dirty = false;
            return;
          }

          serverRef.current = {
            liked: result.data.liked,
            count: result.data.likeCount,
          };
          setFromServer(serverRef.current);
          // O servidor é a fonte da verdade também para quem eventualmente reler este registro após um remount
          state.server = serverRef.current;
        } catch (error) {
          // Sem isso, uma exceção escaparia do while sem nunca desfazer o estado otimista
          console.error("Falha ao sincronizar like do comentário:", error);
          likedRef.current = serverRef.current.liked;
          setLikedByUser(serverRef.current.liked);
          state.liked = serverRef.current.liked;
          state.dirty = false;
          return;
        }
      }
      // Convergiu: a intenção do usuário já é o que o servidor tem.
      state.dirty = false;
    } finally {
      inFlightRef.current = false;
      state.inFlight = false;
    }
  }, [comment.id, commentIdKey]);

  const debouncedSync = useDebouncedCallback(sync, DEBOUNCE_DURATION);

  React.useEffect(() => {
    // Se este comentário já tinha uma intenção pendente registrada, retomamos a sincronização imediatamente em vez de deixar o
    // estado remontado (vindo de `comment`) vencer silenciosamente o clique que o usuário já tinha feito
    const state = getPendingState(
      commentIdKey,
      likedRef.current,
      serverRef.current.count,
    );
    if (state.dirty && !state.inFlight) {
      likedRef.current = state.liked;
      serverRef.current = state.server;
      setLikedByUser(state.liked);
      setFromServer(state.server);
      sync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentIdKey]);

  React.useEffect(() => {
    // Garante que uma ação pendente (dentro da janela de debounce) não
    // seja descartada silenciosamente se o componente desmontar antes do
    // timer disparar (navegação, ou — agora coberto acima — um remount
    // puramente do React).
    return () => {
      debouncedSync.flush();
    };
  }, [debouncedSync]);

  const handleLikeOrDislike = async () => {
    if (!isSignedIn) {
      const callbackUrl = `${window.location.origin}${currentPath}?${returnParams.toString()}#${likeHash}`;
      await signIn("keycloak", { callbackUrl });
      return;
    }

    setIsHighlightedLike(false);

    const next = !likedRef.current; // Evita closure desatualizada (stale closure)
    likedRef.current = next;
    setLikedByUser(next); // Otimista (visual primeiro, resolve depois)

    const state = getPendingState(commentIdKey, next, serverRef.current.count);
    state.liked = next;
    state.dirty = next !== serverRef.current.liked;

    debouncedSync();
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
            likedByUser
              ? "stroke-primary fill-primary"
              : "stroke-current fill-none",
          )}
        >
          <path d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" />
        </svg>
      </Button>
      {likeCount}
    </span>
  );
}
