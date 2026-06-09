"use client";

import React from "react";
import CommentEditor, { characterLimit } from "./CommentEditor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import deleteComment from "../../services/comment/deleteComment";
import Spinner from "../Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import { AvatarName } from "../Avatar";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "../Button";
import { cn } from "../../utils/variants";
import { publicWebUrls } from "../../routing/routes";
import { sonnerPromise, sonnerToastPromise } from "../../utils/sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../AlertDialog";
import putComment from "../../services/comment/putComment";

interface TiptapNode {
  type: string;
  text?: string;
  content?: TiptapNode[];
  attrs?: Record<string, unknown>;
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>;
}

function getTiptapText(node: TiptapNode | null | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(getTiptapText).join(" ");
  }
  return "";
}

function countWords(text: string): number {
  const cleanText = text.trim();
  if (!cleanText) return 0;
  return cleanText.split(/\s+/).length;
}

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

function ensureTiptapJson(body: string): Record<string, unknown> {
  const trimmed = body ? body.trim() : "";

  if (trimmed) {
    try {
      const parsed = JSON.parse(trimmed);
      if (
        parsed &&
        typeof parsed === "object" &&
        parsed.type === "doc" &&
        Array.isArray(parsed.content)
      ) {
        return parsed;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Plain text, usually sent from server
    }
  }
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: body || "[Comentário indisponível]",
          },
        ],
      },
    ],
  };
}

function clearHash() {
  window.history.replaceState(
    null,
    document.title,
    window.location.pathname + window.location.search,
  );
}

export function replaceHash(hash: string) {
  window.history.replaceState(
    null,
    document.title,
    `${window.location.pathname}${window.location.search}${hash}`,
  );
}

export default function CommentItem({
  articleId,
  comment,
  depth,
}: {
  articleId: string;
  comment: Comments;
  depth: number;
}) {
  const { user } = useAuth();
  const replyHash = `#comment-${comment.id}`;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnParams = new URLSearchParams(searchParams.toString());
  returnParams.delete("redirect_url");
  returnParams.delete("login");
  returnParams.delete("callbackUrl");
  returnParams.delete("callback");
  returnParams.delete("replyTo");
  const search = returnParams.toString();
  const fullPath =
    (search ? `${currentPath}?${search}` : currentPath) + replyHash;
  const loginUrl = `${publicWebUrls.signIn}?redirect_url=${encodeURIComponent(fullPath)}&login=reply_comment`;

  const safeTiptapContent = React.useMemo(() => {
    if (comment.isBlocked) return ensureTiptapJson("[Comentário bloqueado]");
    if (comment.isDeleted) return ensureTiptapJson("[Comentário excluído]");
    return ensureTiptapJson(comment.body);
  }, [comment.body, comment.isDeleted, comment.isBlocked]);

  const [, delAction, isDelPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => (
      <p>{serverResponse.success ?? "Comentário excluído"}</p>
    );
    const error = (serverResponse: ActionState) => (
      <p>{serverResponse.error ?? "Erro ao excluir comentário"}</p>
    );

    if (!user?.data) return defaultState;

    const data = {
      commentId: comment.id,
      userId: user?.data.id,
      articlePath: currentPath,
    };
    const promise = deleteComment(data);
    const result = sonnerPromise(promise);
    sonnerToastPromise(result, success, error, "Excluindo comentário...");

    return result;
  }, defaultState);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: safeTiptapContent,
    extensions: [
      Document,
      Text,
      Paragraph,
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
  });

  React.useEffect(() => {
    if (window.location.hash !== replyHash) {
      return;
    }

    React.startTransition(() => {
      setIsReplying(true);
    });
  }, [comment.id, replyHash]);

  React.useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(safeTiptapContent);
    }
  }, [safeTiptapContent, editor]);

  const handleSave = async (editorData: Omit<CommentSave, "commentId">) => {
    // Saves for a possible rollback
    const previousContent = comment.body;

    // Otimistic update:
    // Trusts that 'putComment' will successfully updates user comments
    // Forces editor to update its internal state to the new comment
    if (editor && !editor.isDestroyed && editorData.body) {
      try {
        editor.commands.setContent(JSON.parse(editorData.body));
      } catch {
        editor.commands.setContent(editorData.body);
      }
    }

    const result = await putComment({
      commentId: comment.id,
      parentId: comment.parentId,
      ...editorData,
    });

    // Rollback
    if (!result || !result.ok) {
      if (editor && !editor.isDestroyed) {
        try {
          editor.commands.setContent(JSON.parse(previousContent));
        } catch {
          editor.commands.setContent(previousContent);
        }
      }

      // Optional:
      // Reopens editor, so the user don't lose everything he has typed
      setIsEditing(true);
    }

    return result;
  };

  const handleReplyClick = () => {
    if (!user?.ok) {
      router.push(loginUrl, { scroll: false });
      return;
    }
    const isOpening = !isReplying;
    setIsReplying(isOpening);
    if (isOpening) {
      replaceHash(replyHash);
    } else {
      clearHash();
    }
  };

  const closeEditor = () => {
    setIsReplying(false);
    clearHash();
  };

  const fullText = getTiptapText(safeTiptapContent as unknown as TiptapNode);
  const isCommentDeleted = comment.isDeleted;
  const isCommentBlocked = comment.isBlocked;
  const authorName = isCommentDeleted
    ? "[Excluído]"
    : isCommentBlocked
      ? "[Bloqueado]"
      : comment.user.name;
  const authorPicUrl =
    isCommentDeleted || isCommentBlocked ? null : comment.user.pictureUrl;
  const bodyClasses =
    isCommentDeleted || isCommentBlocked
      ? "text-neutral-500 dark:text-neutral-500"
      : "text-neutral-900 dark:text-neutral-100";
  const characterCount =
    isCommentDeleted || isCommentBlocked ? 0 : fullText.length;
  const wordCount =
    isCommentDeleted || isCommentBlocked ? 0 : countWords(fullText);
  const isCommentOwner = comment.user.id === user?.data?.id;

  return (
    <>
      <div className="flex justify-between items-center">
        <AvatarName
          key={comment.user.id}
          authorName={authorName}
          authorPicUrl={authorPicUrl}
        />
        {isCommentOwner && !isCommentDeleted && !isCommentBlocked && (
          <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "size-8 px-0",
                  isMenuOpen &&
                    "text-neutral-900 dark:text-neutral-100 border-stone-400 dark:border-stone-600 bg-stone-300 dark:bg-stone-800",
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
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-1 gap-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="w-20 h-8"
              >
                Editar
              </Button>
              <DeleteCommentButton
                action={delAction}
                isPending={isDelPending}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
      {isEditing ? (
        <CommentEditor
          articleId={articleId}
          initialContent={comment.body}
          parentId={comment.parentId}
          onSuccess={() => setIsEditing(false)}
          initialCharacterCount={characterCount}
          initialWordCount={wordCount}
          autoFocus
          onSave={handleSave}
        />
      ) : (
        <EditorContent
          editor={editor}
          className={cn(
            "w-full h-full text-left text-sm **:outline-none border-b py-2 prose dark:prose-invert max-w-none [&_.tiptap.ProseMirror_p]:not-only:mb-3 [&_.tiptap.ProseMirror_p]:last:mb-0 ",
            bodyClasses,
          )}
        />
      )}
      {!isCommentDeleted && !isCommentBlocked && (
        <div className="scroll-mt-24 flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full size-8 [&_svg]:text-neutral-900 dark:[&_svg]:text-neutral-100 opacity-100"
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
              >
                <path d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" />
              </svg>
            </Button>
            0
          </span>
          <span className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500">
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
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            0
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={handleReplyClick}
            className={cn(
              "h-8 text-neutral-900 dark:text-neutral-100 opacity-100",
              isReplying &&
                "border-primary/50 bg-primary/25 dark:hover:border-primary/75 dark:hover:bg-primary/35",
            )}
          >
            Responder
          </Button>
        </div>
      )}
      {isReplying && (
        <div className="p-2 rounded-lg border border-primary/50 bg-primary/10">
          <AvatarName
            key={user?.data?.id}
            authorName={user?.data?.name}
            authorPicUrl={user?.data?.pictureUrl}
          />
          <CommentEditor
            articleId={articleId}
            parentId={comment.id}
            anchor={replyHash}
            onSuccess={closeEditor}
            onCancel={closeEditor}
            autoFocus
          />
        </div>
      )}
    </>
  );
}

const DeleteCommentButton = ({
  action,
  isPending,
}: {
  action: () => void;
  isPending: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" disabled={isPending} className="w-20 h-8">
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>Excluir comentário</AlertDialogHeader>
        <form action={action}>
          <AlertDialogDescription className="p-4">
            Confirmar?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              className="w-full max-w-30 h-8"
            >
              Cancelar
            </AlertDialogCancel>
            <Button
              type="button"
              disabled={isPending}
              variant="default"
              className="w-full max-w-30 h-8"
              onClick={() => {
                React.startTransition(() => {
                  action();
                });
              }}
            >
              {isPending && <Spinner />} Confirmar
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
