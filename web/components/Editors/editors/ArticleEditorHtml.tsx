"use client";

import React from "react";
import {
  EditorContent,
  getMarkRange,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Link, { LinkProtocolOptions } from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import History from "@tiptap/extension-history";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { cn, focusRing } from "../../../utils/variants";
import { Skeleton } from "../../Skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderPrimitive,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../AlertDialog";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../Fieldset";

const btnGroupStyle =
  "flex [&_button]:border [&_button]:first:rounded-l [&_button]:border-r-0 [&_button]:last:border-r [&_button]:last:rounded-r [&_button]:focus-visible:z-10 [&_button]:focus-visible:border-transparent";

const validateAllowedUri = (
  url: string,
  ctx: {
    defaultValidate: (url: string) => boolean;
    protocols: Array<LinkProtocolOptions | string>;
    defaultProtocol: string;
  },
) => {
  try {
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`${ctx.defaultProtocol}://${url}`);

    // Tiptap general validation
    if (!ctx.defaultValidate(parsedUrl.href)) {
      return false; // Invalid URL
    }

    const disallowedDomains = [""];
    const domain = parsedUrl.hostname;

    const disallowedProtocols = ["ftp", "file", "mailto"];
    const protocol = parsedUrl.protocol.replace(":", "");

    const allowedProtocols = ctx.protocols.map((p) =>
      typeof p === "string" ? p : p.scheme,
    );

    if (disallowedProtocols.includes(protocol)) {
      return false; // Not allowed
    }
    if (!allowedProtocols.includes(protocol)) {
      return false; // Not allowed
    }
    if (disallowedDomains.includes(domain)) {
      return false; // Not allowed
    }

    return true; // all checks have passed
  } catch {
    return false;
  }
};

const validateAllowedAutoLink = (url: string) => {
  try {
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`https://${url}`);

    const disallowedDomains = [""];
    const domain = parsedUrl.hostname;

    return !disallowedDomains.includes(domain);
  } catch {
    return false;
  }
};

export function HtmlEditor({
  id,
  setVal,
  defaultValue,
}: {
  id: string;
  setVal: (data: string) => void;
  defaultValue?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [textLinkInput, setTextLinkInput] = React.useState("");
  const [linkInput, setLinkInput] = React.useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Text,
      Paragraph,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => validateAllowedUri(url, ctx),
        shouldAutoLink: (url) => validateAllowedAutoLink(url),
      }),
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
    onUpdate: ({ editor }) => setVal(editor.getHTML()),
  });

  const updateLink = React.useCallback(() => {
    if (!editor || !editor.state) return;

    try {
      const { state, schema } = editor;
      const { selection } = state;
      const { from } = selection;
      const $from = state.doc.resolve(from);
      const linkMark = schema.marks.link;
      const range = getMarkRange($from, linkMark);

      const displayContent =
        textLinkInput && textLinkInput.trim() !== ""
          ? textLinkInput
          : linkInput;

      if (range) {
        editor
          .chain()
          .focus()
          .insertContentAt(
            { from: range.from, to: range.to },
            {
              type: "text",
              text: displayContent,
              marks: [{ type: "link", attrs: { href: linkInput } }],
            },
          )
          .run();
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkInput })
          .run();
      }
    } catch (e) {
      console.error("Error updating link:", e);
    }
  }, [editor, linkInput, textLinkInput]);

  const setLink = React.useCallback(() => {
    if (!editor) return;

    // Default behave: if linkInput is left empty, removes link.
    if (linkInput === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Which text to display. If no textLinkInput, linkInput is used instead
    const displayContent =
      textLinkInput && textLinkInput.trim() !== "" ? textLinkInput : linkInput;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "text",
        text: displayContent,
        marks: [
          {
            type: "link",
            attrs: {
              href: linkInput,
            },
          },
        ],
      })
      .run();
  }, [editor, linkInput, textLinkInput]);

  const getKeyboardSelection = () => {
    if (!editor) return "";

    const { state } = editor;
    const { selection } = state;

    // If keyboard cursor is left inside <a></a>
    const { from, to } = selection;
    const $from = state.doc.resolve(from);

    const range = getMarkRange($from, state.schema.marks.link);

    if (range) {
      return state.doc.textBetween(range.from, range.to, " ");
    }

    // Fallback: selected text
    return state.doc.textBetween(from, to, " ");
  };

  const getKeyboardSelectionUrl = () => {
    if (!editor) return "";

    const { state } = editor;
    const { from } = state.selection;
    const $from = state.doc.resolve(from);

    const linkMark = state.schema.marks.link;
    const range = getMarkRange($from, linkMark);

    if (range) {
      const node = state.doc.nodeAt(range.from);
      if (node) {
        const mark = node.marks.find((m) => m.type.name === "link");
        return mark?.attrs.href || "";
      }
    }

    return "";
  };

  const handleLinkClick = () => {
    const selectedText = getKeyboardSelection();
    setTextLinkInput(selectedText || "");
    const selectedUrl = getKeyboardSelectionUrl();
    setLinkInput(selectedUrl);
    setIsDialogOpen(true);
  };

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      return {
        isActiveHeading2: editor.isActive("heading", { level: 2 }),
        isActiveHeading3: editor.isActive("heading", { level: 3 }),
        isActiveHeading4: editor.isActive("heading", { level: 4 }),
        isActiveBold: editor.isActive("bold"),
        isActiveHighlight: editor.isActive("highlight"),
        isActiveLink: editor.isActive("link"),
        isActiveBulletList: editor.isActive("bulletList"),
        isActiveOrderedList: editor.isActive("orderedList"),
      };
    },
  });

  if (!editor) {
    return (
      <div className="w-full h-100 border rounded flex flex-col p-2 gap-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/3 h-4" />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/6 h-4" />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[75%] h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[85%] h-4" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2 pb-1">
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              editorState?.isActiveHeading2
                ? "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800 hover:bg-stone-450 dark:hover:bg-stone-750"
                : "[&_svg]:stroke-neutral-400 dark:[&_svg]:stroke-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800",
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
              editorState?.isActiveHeading3
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
              editorState?.isActiveHeading4
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
              editorState?.isActiveBold
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
              editorState?.isActiveHighlight
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
          <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                tabIndex={0}
                onClick={handleLinkClick}
                className={cn(
                  editorState?.isActiveLink
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
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md gap-2">
              <AlertDialogHeaderPrimitive>
                <AlertDialogTitle>
                  Hyperlink
                  <AlertDialogCancel
                    onClick={() => {
                      setIsDialogOpen(false);
                      editor.chain().focus();
                    }}
                    className="absolute top-1/2 -translate-y-1/2 right-3 size-8"
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
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </AlertDialogCancel>
                </AlertDialogTitle>
              </AlertDialogHeaderPrimitive>
              <div className="flex flex-col gap-2 p-4">
                <AlertDialogDescription className="text-sm">
                  Se você deixar o texto vazio, o texto será o próprio link.
                </AlertDialogDescription>
                <Fieldset>
                  <FieldsetInput
                    id="text-link"
                    value={textLinkInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTextLinkInput(e.target.value)
                    }
                    // placeholder=""
                    // className=""
                    // {...props}
                  />
                  <FieldsetLabel htmlFor="text-link" label="Texto" />
                </Fieldset>
                <Fieldset>
                  <FieldsetInput
                    id="text-url"
                    value={linkInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLinkInput(e.target.value)
                    }
                    // placeholder=""
                    // className=""
                    // {...props}
                  />
                  <FieldsetLabel htmlFor="text-url" label="URL" />
                </Fieldset>
              </div>
              <AlertDialogFooter className="p-2">
                <div className="flex-1">
                  <AlertDialogCancel
                    onClick={() => {
                      setIsDialogOpen(false);
                      editor.chain().focus().unsetLink().run();
                    }}
                    className="h-fit py-1 w-24"
                  >
                    Remover
                  </AlertDialogCancel>
                </div>
                <div className="flex gap-1">
                  <AlertDialogCancel
                    onClick={() => {
                      setIsDialogOpen(false);
                    }}
                    className="h-fit py-1 w-24"
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      setIsDialogOpen(false);
                      if (editor?.isActive("link")) {
                        updateLink();
                      } else {
                        setLink();
                      }
                    }}
                    className="h-fit py-1 w-24"
                  >
                    Salvar
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className={btnGroupStyle}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              editorState?.isActiveBulletList
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
              editorState?.isActiveOrderedList
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
          "p-1 flex flex-col transition-all duration-300 rounded border bg-stone-200/50 dark:bg-stone-950 [&_.tiptap.ProseMirror]:h-100 [&_.tiptap.ProseMirror]:overflow-y-auto [&_.tiptap.ProseMirror]:p-2 [&_.tiptap.ProseMirror]:pr-6 [&_.tiptap.ProseMirror]:rounded-b-xs [&_.tiptap.ProseMirror]:outline-none [&_.tiptap.ProseMirror]:transition-all [&_.tiptap.ProseMirror]:scrollbar [&_.tiptap.ProseMirror_h2]:text-lg lg:[&_.tiptap.ProseMirror_h2]:text-2xl [&_.tiptap.ProseMirror_h2]:font-semibold [&_.tiptap.ProseMirror_h2]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h2]:text-neutral-100 [&_.tiptap.ProseMirror_h2]:scroll-m-20 [&_.tiptap.ProseMirror_h2]:tracking-tight [&_.tiptap.ProseMirror_h2]:text-balance [&_.tiptap.ProseMirror_h2]:not-first:mt-6 [&_.tiptap.ProseMirror_h3]:text-lg [&_.tiptap.ProseMirror_h3]:lg:text-xl [&_.tiptap.ProseMirror_h3]:font-semibold [&_.tiptap.ProseMirror_h3]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h3]:text-neutral-100 [&_.tiptap.ProseMirror_h3]:scroll-m-20 [&_.tiptap.ProseMirror_h3]:tracking-tight [&_.tiptap.ProseMirror_h3]:not-first:mt-6 [&_.tiptap.ProseMirror_h4]:text-lg [&_.tiptap.ProseMirror_h4]:lg:text-lg [&_.tiptap.ProseMirror_h4]:font-semibold [&_.tiptap.ProseMirror_h4]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h4]:text-neutral-100 [&_.tiptap.ProseMirror_h4]:scroll-m-20 [&_.tiptap.ProseMirror_h4]:tracking-tight [&_.tiptap.ProseMirror_h4]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-base [&_.tiptap.ProseMirror_p]:font-normal [&_.tiptap.ProseMirror_p]:leading-7 [&_.tiptap.ProseMirror_p]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-neutral-900 dark:[&_.tiptap.ProseMirror_p]:text-neutral-400 [&_.tiptap.ProseMirror_strong]:text-primary [&_.tiptap.ProseMirror_strong]:font-bold [&_.tiptap.ProseMirror_mark]:text-neutral-500 [&_.tiptap.ProseMirror_mark]:border dark:[&_.tiptap.ProseMirror_mark]:bg-stone-850 [&_.tiptap.ProseMirror_mark]:px-1 [&_.tiptap.ProseMirror_mark]:rounded-lg [&_.tiptap.ProseMirror_mark]:py-0.5 [&_.tiptap.ProseMirror_a]:text-primary [&_.tiptap.ProseMirror_a]:border dark:[&_.tiptap.ProseMirror_a]:bg-stone-850 [&_.tiptap.ProseMirror_a]:underline [&_.tiptap.ProseMirror_a]:underline-offset-2 [&_.tiptap.ProseMirror_a]:px-1 [&_.tiptap.ProseMirror_a]:rounded-lg [&_.tiptap.ProseMirror_a]:py-0.5 [&_.tiptap.ProseMirror_ul]:not-first:mt-6 [&_.tiptap.ProseMirror_ul]:ml-6 [&_.tiptap.ProseMirror_ul]:list-disc [&_.tiptap.ProseMirror_ul~li]:first:mt-6 [&_.tiptap.ProseMirror_ol]:not-first:mt-6 [&_.tiptap.ProseMirror_ol]:ml-6 [&_.tiptap.ProseMirror_ol]:list-decimal [&_.tiptap.ProseMirror_ol~li]:first:mt-6 [&_.tiptap.ProseMirror_li]:text-neutral-900 dark:[&_.tiptap.ProseMirror_li]:text-neutral-400",
        )}
      />
    </>
  );
}
