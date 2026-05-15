"use client";

import React from "react";
import CommentEditor from "./CommentEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

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
    editable: false,
    content: JSON.parse(comment.body),
    extensions: [Document, Text, Paragraph],
  });

  return (
    <div>
      <EditorContent
        editor={editor}
        className="prose dark:prose-invert max-w-none"
      />
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
