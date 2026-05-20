"use client";

import React from "react";
import CommentEditor, { characterLimit } from "./CommentEditor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import deleteComment from "../../services/comment/deleteComment";
import Spinner from "../Spinner";
import { usePathname } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import { AvatarName } from "../Avatar";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "../Button";
import { cn } from "../../utils/variants";
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
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const articlePath = usePathname();

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
      articlePath,
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
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(safeTiptapContent);
    }
  }, [safeTiptapContent, editor]);

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
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" className="size-8 px-0">
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
          onSuccess={() => setIsEditing(false)}
          initialCharacterCount={characterCount}
          initialWordCount={wordCount}
          autoFocus
          onSave={async (newBody) => {
            // TODO
            console.log(
              "Chamando backend Java para atualizar:",
              comment.id,
              newBody,
            );
            return {
              ok: true,
              success: "Comentário atualizado!",
              data: null,
              error: null,
            };
          }}
        />
      ) : (
        <>
          <EditorContent
            editor={editor}
            className={cn(
              "w-full h-full text-left text-sm **:outline-none border-b py-2 prose dark:prose-invert max-w-none",
              bodyClasses,
            )}
          />
          {/* {!isBodyHidden && (
            <div className="flex justify-between items-center gap-1">
              <div className="flex items-center gap-1 h-6">
                <span className="text-sm text-neutral-500">
                  Tamanho: {characterCount}/{characterLimit}
                </span>
                <span className="text-sm text-neutral-500">
                  Palavras: {wordCount}
                </span>
              </div>
            </div>
          )} */}
        </>
      )}
      {isReplying && (
        <div className="mt-4">
          <CommentEditor
            articleId={articleId}
            parentId={comment.id}
            onSuccess={() => setIsReplying(false)}
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
