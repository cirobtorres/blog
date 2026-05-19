"use client";

import React from "react";
import CommentEditor, { characterLimit } from "./CommentEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { AvatarName } from "../Avatar";
import CharacterCount from "@tiptap/extension-character-count";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { useAuth } from "../../providers/AuthProvider";
import { Button } from "../Button";
import { sonnerPromise, sonnerToastPromise } from "../../utils/sonner";
import deleteComment from "../../services/comment/deleteComment";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/variants";

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
  try {
    const trimmed = body.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      return JSON.parse(trimmed);
    }
  } catch (e) {
    console.error(
      "Falha ao processar JSON do Tiptap, aplicando fallback de texto plano.",
      e,
    );
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
  const articlePath = usePathname();

  const safeTiptapContent = React.useMemo(() => {
    return ensureTiptapJson(comment.body);
  }, [comment.body]);

  const [delState, delAction, isDelPending] = React.useActionState(async () => {
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

  const fullText = getTiptapText(safeTiptapContent as unknown as TiptapNode);
  const isNameHidden = comment.user.name === "[Excluído]";
  const isBodyHidden =
    fullText === "[Comentário excluído]" ||
    fullText === "[Comentário bloqueado]" ||
    fullText === "[Comentário indisponível]";
  const authorName = isNameHidden ? "[Excluído]" : comment.user.name;
  const authorPicUrl = isNameHidden ? null : comment.user.pictureUrl;
  const bodyClasses = isBodyHidden
    ? "text-neutral-500 dark:text-neutral-500"
    : "text-neutral-900 dark:text-neutral-100";
  const characterCount = isBodyHidden ? 0 : fullText.length;
  const wordCount = isBodyHidden ? 0 : countWords(fullText);

  return (
    <>
      <div className="flex justify-between items-center">
        <AvatarName
          key={comment.user.id}
          authorName={authorName}
          authorPicUrl={authorPicUrl}
        />
        {comment.user.id === user?.data?.id && !isNameHidden && (
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
                onClick={() => console.log("Editar")}
                className="w-full max-w-20 h-6"
              >
                Editar
              </Button>
              <form action={delAction}>
                <Button
                  type="submit"
                  variant="ghost"
                  disabled={isDelPending}
                  className="w-full max-w-20 h-6"
                >
                  Excluir
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          "w-full h-full text-left text-sm **:outline-none border-b [scrollbar-width:none] [-ms-overflow-style:none] py-2 prose dark:prose-invert max-w-none",
          bodyClasses,
        )}
      />
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
