"use client";

import React from "react";
import CommentEditor, { characterLimit } from "./CommentEditor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import { usePathname, useSearchParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import { AvatarName } from "../Avatar";
import { Button } from "../Button";
import { cn } from "../../utils/variants";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import putComment from "../../services/comment/putComment";
import { signIn, useSession } from "next-auth/react";
import CommentLikeButton from "./CommentLikeButton";
import CommentDeleteButton from "./CommentDeleteButton";

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
      // Plain text from server
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
}: {
  articleId: string;
  comment: Comments;
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const isSignedIn = !!user?.id;
  const replyHash = `comment-reply-${comment.id}`;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const replyTo = searchParams.get("replyTo");
  const returnParams = new URLSearchParams(searchParams.toString());
  returnParams.delete("redirect_url");
  returnParams.delete("login");
  returnParams.delete("callbackUrl");
  returnParams.delete("callback");
  returnParams.delete("replyTo");
  const search = returnParams.toString();
  const redirectParams = new URLSearchParams(search);
  redirectParams.set("replyTo", comment.id);

  const safeTiptapContent = React.useMemo(() => {
    if (comment.isBlocked) return ensureTiptapJson("[Comentário bloqueado]");
    if (comment.isDeleted) return ensureTiptapJson("[Comentário excluído]");
    return ensureTiptapJson(comment.body);
  }, [comment.body, comment.isDeleted, comment.isBlocked]);

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
    if (!isSignedIn) return;
    if (replyTo !== comment.id) return;
    React.startTransition(() => {
      setIsReplying(true);
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("replyTo");
    const query = params.toString();
    window.history.replaceState(
      null,
      document.title,
      `${window.location.pathname}${query ? `?${query}` : ""}#comment-${comment.id}`,
    );
  }, [isSignedIn, replyTo, comment.id, searchParams]);

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
  const isCommentOwner = comment.user.id === user?.id;

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
            <CommentMenuButton isMenuOpen={isMenuOpen} />
            <PopoverContent className="w-fit p-1 gap-1">
              <CommentEditButton onClick={() => setIsEditing(true)} />
              <CommentDeleteButton
                userId={user.id}
                commentId={comment.id}
                currentPath={currentPath}
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
          <CommentLikeButton
            comment={comment}
            isSignedIn={isSignedIn}
            currentPath={currentPath}
            returnParams={returnParams}
          />
          <CommentReplyLength length={comment.replies?.length ?? 0} />
          <CommentReplyButton
            isSignedIn={isSignedIn}
            commentId={comment.id}
            replyHash={replyHash}
            currentPath={currentPath}
            searchParams={searchParams.toString()}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        </div>
      )}
      {isReplying && isSignedIn && (
        <div className="p-2 rounded-lg border border-primary/50 bg-primary/10">
          <AvatarName key={user?.id} authorName={user?.name || "Anonymous"} />
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

const CommentEditButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="button" variant="ghost" onClick={onClick} className="w-20 h-8">
    Editar
  </Button>
);

const CommentReplyLength = ({ length }: { length: number }) => (
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
    {length}
  </span>
);

const CommentMenuButton = ({ isMenuOpen }: { isMenuOpen: boolean }) => (
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
);

const CommentReplyButton = ({
  isSignedIn,
  commentId,
  replyHash,
  currentPath,
  searchParams,
  isReplying,
  setIsReplying,
}: {
  isSignedIn: boolean;
  commentId: string;
  replyHash: string;
  currentPath: string;
  searchParams: string;
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleReplyClick = async () => {
    if (!isSignedIn) {
      const returnParams = new URLSearchParams(searchParams);
      returnParams.set("replyTo", commentId);
      const callbackUrl = `${window.location.origin}${currentPath}?${returnParams.toString()}#${replyHash}`;

      await signIn("keycloak", {
        callbackUrl,
      });
      return;
    }

    const next = !isReplying;
    setIsReplying(next);

    if (next) {
      queueMicrotask(() => {
        replaceHash("#" + replyHash);
      });
    } else {
      queueMicrotask(() => {
        clearHash();
      });
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleReplyClick}
      className={cn(
        "h-8 text-neutral-900 dark:text-neutral-100 opacity-100",
        isReplying && "border-primary/50 bg-primary/25", // dark:hover:border-primary/75 dark:hover:bg-primary/35
      )}
    >
      Responder
    </Button>
  );
};
