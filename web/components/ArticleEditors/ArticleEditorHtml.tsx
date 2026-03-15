"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import History from "@tiptap/extension-history";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import { cn, focusRing } from "../../utils/variants";
import Spinner from "../Spinner";
import React from "react";

export function ArticleEditorHtml({
  id,
  defaultValue,
}: {
  id: string;
  defaultValue?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Text,
      Paragraph,
      Heading.configure({
        levels: [2, 3, 4],
      }),
      History,
      Bold,
      Highlight,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: defaultValue,
    onUpdate: () => {},
  });

  React.useEffect(() => {
    if (editor) {
      // setVal(editor.getHTML());
    }
  }, [editor]);

  if (!editor) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex gap-2 pb-1">
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              editor.isActive("heading", { level: 2 })
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M4 12h8" />
              <path d="M4 18V6" />
              <path d="M12 18V6" />
              <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={cn(
              editor.isActive("heading", { level: 3 })
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M4 12h8" />
              <path d="M4 18V6" />
              <path d="M12 18V6" />
              <path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" />
              <path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={cn(
              editor.isActive("heading", { level: 4 })
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M12 18V6" />
              <path d="M17 10v3a1 1 0 0 0 1 1h3" />
              <path d="M21 10v8" />
              <path d="M4 12h8" />
              <path d="M4 18V6" />
            </svg>
          </button>
        </div>
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              editor.isActive("bold")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(
              editor.isActive("highlight")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="m9 11-6 6v3h9l3-3" />
              <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
            </svg>
          </button>
        </div>
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleLink().run()}
            className={cn(
              editor.isActive("link")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M9 17H7A5 5 0 0 1 7 7h2" />
              <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
          </button>
        </div>
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              editor.isActive("bulletList")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M3 5h.01" />
              <path d="M3 12h.01" />
              <path d="M3 19h.01" />
              <path d="M8 5h13" />
              <path d="M8 12h13" />
              <path d="M8 19h13" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              editor.isActive("orderedList")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M11 5h10" />
              <path d="M11 12h10" />
              <path d="M11 19h10" />
              <path d="M4 4h1v5" />
              <path d="M4 9h2" />
              <path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => console.log("To-do list")}
            className={cn(
              editor.isActive("link")
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800"
                : "text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              "cursor-pointer transition-all duration-300",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M13 5h8" />
              <path d="M13 12h8" />
              <path d="M13 19h8" />
              <path d="m3 17 2 2 4-4" />
              <rect x="3" y="4" width="6" height="6" rx="1" />
            </svg>
          </button>
        </div>
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className={cn(
              "cursor-pointer transition-all duration-300 text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className={cn(
              "cursor-pointer transition-all duration-300 text-neutral-400 dark:text-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
              focusRing,
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
              className="size-8 p-1.5"
            >
              <path d="m15 14 5-5-5-5" />
              <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
            </svg>
          </button>
        </div>
      </div>
      <EditorContent
        id={id}
        name={id}
        editor={editor}
        autoComplete="new-password"
        spellCheck={false}
        onFocus={() => editor.chain().selectTextblockEnd().focus()}
        className={cn(
          "p-1 flex flex-col transition-all duration-300 rounded border dark:bg-stone-950 [&_.tiptap.ProseMirror]:h-100 [&_.tiptap.ProseMirror]:overflow-y-auto [&_.tiptap.ProseMirror]:p-2 [&_.tiptap.ProseMirror]:pr-6 [&_.tiptap.ProseMirror]:rounded-b-xs [&_.tiptap.ProseMirror]:outline-none [&_.tiptap.ProseMirror]:transition-all [&_.tiptap.ProseMirror]:scrollbar [&_.tiptap.ProseMirror_h2]:text-lg lg:[&_.tiptap.ProseMirror_h2]:text-2xl [&_.tiptap.ProseMirror_h2]:font-semibold [&_.tiptap.ProseMirror_h2]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h2]:text-neutral-100 [&_.tiptap.ProseMirror_h2]:scroll-m-20 [&_.tiptap.ProseMirror_h2]:tracking-tight [&_.tiptap.ProseMirror_h2]:text-balance [&_.tiptap.ProseMirror_h2]:not-first:mt-6 [&_.tiptap.ProseMirror_h3]:text-lg [&_.tiptap.ProseMirror_h3]:lg:text-xl [&_.tiptap.ProseMirror_h3]:font-semibold [&_.tiptap.ProseMirror_h3]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h3]:text-neutral-100 [&_.tiptap.ProseMirror_h3]:scroll-m-20 [&_.tiptap.ProseMirror_h3]:tracking-tight [&_.tiptap.ProseMirror_h3]:not-first:mt-6 [&_.tiptap.ProseMirror_h4]:text-lg [&_.tiptap.ProseMirror_h4]:lg:text-lg [&_.tiptap.ProseMirror_h4]:font-semibold [&_.tiptap.ProseMirror_h4]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h4]:text-neutral-100 [&_.tiptap.ProseMirror_h4]:scroll-m-20 [&_.tiptap.ProseMirror_h4]:tracking-tight [&_.tiptap.ProseMirror_h4]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-base [&_.tiptap.ProseMirror_p]:font-normal [&_.tiptap.ProseMirror_p]:leading-7 [&_.tiptap.ProseMirror_p]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-neutral-900 dark:[&_.tiptap.ProseMirror_p]:text-neutral-400 [&_.tiptap.ProseMirror_ul]:not-first:mt-6 [&_.tiptap.ProseMirror_ul]:ml-6 [&_.tiptap.ProseMirror_ul]:list-disc [&_.tiptap.ProseMirror_ul]:[&>li]:mt-4 [&_.tiptap.ProseMirror_ol]:not-first:mt-6 [&_.tiptap.ProseMirror_ol]:ml-6 [&_.tiptap.ProseMirror_ol]:list-decimal [&_.tiptap.ProseMirror_ol]:[&>li]:mt-4 [&_.tiptap.ProseMirror_li]:text-neutral-900 dark:[&_.tiptap.ProseMirror_li]:text-neutral-400",
        )}
      />
    </div>
  );
}

const btnGroupStyle =
  "flex [&_button]:border [&_button]:first:rounded-l [&_button]:border-r-0 [&_button]:last:border-r [&_button]:last:rounded-r [&_button]:focus-visible:z-10";
