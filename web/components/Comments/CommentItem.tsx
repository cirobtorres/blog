"use client";

import React from "react";
import CommentEditor, { characterLimit } from "./CommentEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Avatar } from "../Avatar";
import CharacterCount from "@tiptap/extension-character-count";

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

export default function CommentItem({
  articleId,
  comment,
  depth,
}: {
  articleId: string;
  comment: Comments;
  depth: number;
}) {
  const [isReplying, setIsReplying] = React.useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: JSON.parse(comment.body),
    extensions: [
      Document,
      Text,
      Paragraph,
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
  });

  const rawJson = comment.body ? JSON.parse(comment.body) : null;
  const fullText = getTiptapText(rawJson);
  const characterCount = fullText.length;
  const wordCount = countWords(fullText);

  return (
    <div>
      <Avatar
        key={comment.user.id}
        authorName={comment.user.name}
        authorPicUrl={comment.user.pictureUrl}
      />
      <EditorContent
        editor={editor}
        className="w-full h-full text-left text-sm text-neutral-900 dark:text-neutral-100 **:outline-none border-b [scrollbar-width:none] [-ms-overflow-style:none] py-2 prose dark:prose-invert max-w-none"
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
    </div>
  );
}
