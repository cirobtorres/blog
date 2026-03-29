"use client";

import React from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import { sonnerToastPromise, soonerPromise } from "../../utils/sooner";
import { Button } from "../Button";

export default function CommentEditor({
  ...props
}: Omit<React.ComponentProps<typeof EditorContent>, "editor">) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [Document, Paragraph, Text],
  });

  React.useEffect(() => {
    if (editor && window.location.hash === "#create-comment") {
      editor.commands.focus();
    }
  }, [editor]);

  const [state, action, isPending] = React.useActionState(async () => {
    const result: Promise<ActionState> = new Promise((resolve) => {
      setTimeout(resolve, 2000, {
        ok: true,
        success: "Teste",
        error: null,
        data: null,
      });
    });
    const promise = soonerPromise(result);

    sonnerToastPromise(
      promise,
      () => <p>Comentário salvo!</p>,
      () => <p>Erro ao salvar comentário</p>,
      "Salvando...",
    );

    return null;
  }, null);

  if (!editor) return <p>Loading...</p>;

  return (
    <form action={action} className="w-full flex flex-col gap-0.5">
      <EditorContent
        {...props}
        editor={editor}
        className="[&_.tiptap.ProseMirror]:border-b **:outline-none relative w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 [scrollbar-width:none] [-ms-overflow-style:none] [&_.tiptap.ProseMirror]:py-2 after:absolute after:top-[calc(100%-1px)] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 focus-within:after:w-full after:bg-primary focus-within:after:duration-200 transition-all"
      />
      <div className="flex justify-end items-center gap-0.5">
        <Button
          type="button"
          disabled={isPending}
          variant="outline"
          className="w-full max-w-30 h-6"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full max-w-30 h-6"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
