"use client";

import Link from "@tiptap/extension-link";
import {
  EditorContent as ArticleEditorContent,
  useEditor,
} from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CustomImage from "../CustomImage";
import Loading from "../../Loading";
import ArticleEditorButtons from "../ArticleEditorButtons";

const CiteExtension = Node.create({
  name: "cite",

  group: "block",

  content: "inline*",

  parseHTML() {
    return [
      {
        tag: "cite",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["cite", mergeAttributes(HTMLAttributes), 0];
  },
});

const ArticleEditor = ({
  content = "",
  onChange,
}: {
  content?: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {},
        },
        heading: {
          HTMLAttributes: {},
          levels: [3],
        },
        bold: {
          HTMLAttributes: {},
        },
        italic: {
          HTMLAttributes: {
            class: "",
          },
        },
        bulletList: {
          HTMLAttributes: {},
        },
        orderedList: {
          HTMLAttributes: {},
        },
        codeBlock: {
          defaultLanguage: "javascript",
          HTMLAttributes: {},
        },
        blockquote: {
          HTMLAttributes: {},
        },
      }),
      CiteExtension,
      Link.configure({
        HTMLAttributes: {},
        openOnClick: false,
        autolink: false,
        defaultProtocol: "https",
      }),
      CustomImage,
      Highlight.configure({
        HTMLAttributes: {
          class: "font-semibold bg-dark-base-green p-1 rounded-xl",
        },
      }),
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] max-h-[500px] w-full py-3 px-4 flex flex-col justify-start items-start overflow-x-hidden border-2 border-base-200 dark:border-dark-base-border rounded-xl scrollbar dark:dark-scrollbar outline-none outline-2 outline-transparent outline-offset-0 focus:outline-blue-500 [&_h3]:editor-heading [&_h3]:dark:editor-dark-heading [&_p]:editor-paragraph [&_p]:dark:editor-dark-paragraph [&_strong]:font-extrabold [&_ol]:editor-ordered-list [&_ol]:editor-list [&_ol]:dark:editor-dark-list [&_ul]:editor-unordered-list [&_ul]:editor-list [&_ul]:dark:editor-dark-list [&_pre]:editor-code [&_a]:editor-link [&_blockquote]:editor-blockquote [&_blockquote]:dark:editor-dark-blockquote [&_cite]:editor-cite [&_cite]:dark:editor-dark-cite",
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <Loading size={30} />; // TODO: change this loading to a skeleton loading
  }

  return (
    editor && (
      <div className="relative w-full flex flex-col">
        <div className="p-2 flex flex-wrap gap-0.5">
          <ArticleEditorButtons editor={editor} />
        </div>
        <ArticleEditorContent editor={editor} className="m-1" />
      </div>
    )
  );
};

export default ArticleEditor;
