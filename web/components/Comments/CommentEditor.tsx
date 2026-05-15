"use client";

import React from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { sonnerToastPromise, sonnerPromise } from "../../utils/sonner";
import { Button } from "../Button";
import { cn, focusRing } from "../../utils/variants";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../Avatar";
import { Skeleton } from "../Skeleton";
import CommentHere from "./CommentHere";
import Spinner from "../Spinner";
import postComment from "../../services/comment/postComment";
import { usePathname } from "next/navigation";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function CommentEditor({
  articleId,
  parentId,
  characterLimit = 512,
  onSuccess,
  ...props
}: Omit<React.ComponentProps<typeof EditorContent>, "editor"> & {
  articleId: string;
  parentId?: string;
  characterLimit?: number;
  onSuccess?: () => void;
}) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const articlePath = usePathname();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "Comente aqui...",
        emptyEditorClass: "is-editor-empty",
        showOnlyCurrent: true,
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
  });

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      characterCount: editor?.storage.characterCount.characters(),
      wordCount: editor?.storage.characterCount.words(),
    }),
  });

  const characterCount = state?.characterCount ?? 0;
  const wordCount = state?.wordCount ?? 0;

  const openEditor = React.useCallback(() => {
    setIsOpen(true);
    const currentChars = editor?.storage.characterCount.characters() ?? 0;
    editor
      ?.chain()
      .focus()
      .setTextSelection(currentChars + 1)
      .run();
  }, [editor]);

  const closeEditor = React.useCallback(() => {
    editor?.commands.clearContent();
    editor?.commands.blur();
    setIsOpen(false);
  }, [editor]);

  React.useEffect(() => {
    if (editor && window.location.hash === "#create-comment") {
      editor.commands.focus();
    }
  }, [editor]);

  const [, action, isPending] = React.useActionState(async () => {
    const success = (serverResponse: ActionState) => {
      onSuccess?.();
      return <p>{serverResponse.success ?? "Comentário salvo!"}</p>;
    };

    const error = (serverResponse: ActionState) => (
      <p>{serverResponse.error ?? "Erro ao salvar comentário"}</p>
    );

    const json = editor?.getJSON();
    if (!json || !json.content)
      return { ...defaultState, error: "JSON inválido ou vazio" };

    // Remove every empty <p></p> (no content)
    const filteredContent = json.content.filter((node) => {
      if (node.type === "paragraph") {
        if (!node.content || node.content.length === 0) return false;
        // Type Guard
        return node.content.some((child) => {
          if ("text" in child && typeof child.text === "string") {
            return child.text.trim() !== "";
          }
          return false;
        });
      }
      return true; // Every other node is kept untouched
    });

    // No paragraph left
    if (filteredContent.length === 0) {
      setIsOpen(false);
      return { ...defaultState, error: "JSON inválido ou vazio" };
    }

    // Rebuild cleaned JSON
    const cleanJson = { ...json, content: filteredContent };
    const obj = {
      articleId,
      articlePath,
      parentId,
      body: JSON.stringify(cleanJson),
    };

    const result = postComment(obj);
    const promise = sonnerPromise(result);
    sonnerToastPromise(promise, success, error, "Comentando...");
    editor?.commands.clearContent();
    setIsOpen(false);

    return defaultState;
  }, defaultState);

  if (!editor)
    return (
      <div className="w-full flex flex-col gap-1">
        <Skeleton className="w-full h-9.5 bg-stone-900 rounded-t-lg rounded-b-none" />
        <div className="w-full flex justify-between items-center gap-1">
          <div className="w-full flex items-center gap-1">
            <Skeleton className="w-full max-w-30 h-5" />
            <Skeleton className="w-full max-w-20 h-5" />
          </div>
          <div className="w-full flex justify-end items-center gap-1">
            <Skeleton className="w-full max-w-30 h-6" />
            <Skeleton className="w-full max-w-30 h-6" />
          </div>
        </div>
      </div>
    );

  if (!user?.ok) {
    return <CommentHere />;
  }

  return (
    <form action={action} className="w-full flex flex-col gap-1">
      <Avatar
        key={user.data.id}
        authorName={user.data.name}
        authorPicUrl={
          user.data.pictureUrl ?? "https://placehold.co/32x32/000/fff/jpeg"
        }
      />
      <EditorContent
        {...props}
        editor={editor}
        onFocus={openEditor}
        className="relative w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 **:outline-none [&_.tiptap.ProseMirror]:border-b [&_.tiptap.ProseMirror_p]:not-only:mb-3 [&_.tiptap.ProseMirror_p]:last:mb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&_.tiptap.ProseMirror]:py-2 after:absolute after:top-[calc(100%-1px)] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 focus-within:after:w-full after:bg-primary focus-within:after:duration-200 transition-all" // [&_.tiptap.ProseMirror]:bg-stone-300 dark:[&_.tiptap.ProseMirror]:bg-stone-900 [&_.tiptap.ProseMirror]:rounded-t-lg [&_.tiptap.ProseMirror]:border
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
        {isOpen && (
          <div className="flex justify-end items-center gap-1">
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              onClick={closeEditor}
              className={cn(
                "w-full max-w-30 h-6 focus-visible:z-10",
                focusRing,
              )}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "w-full max-w-30 h-6 focus-visible:z-10",
                focusRing,
              )}
            >
              {isPending && <Spinner />} Salvar
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
