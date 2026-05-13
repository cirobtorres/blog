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
import CommentHere from "./CommentHere";
import { Skeleton } from "../Skeleton";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function CommentEditor({
  characterLimit = 512,
  ...props
}: Omit<React.ComponentProps<typeof EditorContent>, "editor"> & {
  characterLimit?: number;
}) {
  const { user } = useAuth();

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

  React.useEffect(() => {
    if (editor && window.location.hash === "#create-comment") {
      editor.commands.focus();
    }
  }, [editor]);

  const [, action, isPending] = React.useActionState(async () => {
    const result: Promise<ActionState> = new Promise((resolve) => {
      setTimeout(resolve, 2000, {
        ...defaultState,
        ok: true,
        success: "Teste",
      });
    });
    const promise = sonnerPromise(result);

    sonnerToastPromise(
      promise,
      () => <p>Comentário salvo!</p>,
      () => <p>Erro ao salvar comentário</p>,
      "Salvando...",
    );

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
      <EditorContent
        {...props}
        editor={editor}
        className="relative w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 **:outline-none [&_.tiptap.ProseMirror]:bg-stone-300 dark:[&_.tiptap.ProseMirror]:bg-stone-900 [&_.tiptap.ProseMirror]:rounded-t-lg [&_.tiptap.ProseMirror]:border [&_.tiptap.ProseMirror_p]:not-first:mb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&_.tiptap.ProseMirror]:p-2 after:absolute after:top-[calc(100%-1px)] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 focus-within:after:w-full after:bg-primary focus-within:after:duration-200 transition-all"
      />
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <span className="text-sm text-neutral-500">
            Tamanho: {characterCount}/{characterLimit}
          </span>
          <span className="text-sm text-neutral-500">
            Palavras: {wordCount}
          </span>
        </div>
        <div className="flex justify-end items-center gap-1">
          <Button
            type="button"
            disabled={isPending}
            variant="outline"
            className={cn("w-full max-w-30 h-6 focus-visible:z-10", focusRing)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className={cn("w-full max-w-30 h-6 focus-visible:z-10", focusRing)}
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
