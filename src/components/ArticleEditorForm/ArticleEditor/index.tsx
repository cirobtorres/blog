"use client";

import Link from "@tiptap/extension-link";
import {
  EditorContent as ArticleEditorContent,
  ReactNodeViewRenderer,
  mergeAttributes,
  useEditor,
} from "@tiptap/react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createHTMLDocument } from "zeed-dom";
import { createLowlight } from "lowlight";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CustomImage from "../CustomImage";
import Loading from "../../Loading";
import ArticleEditorButtons from "../ArticleEditorButtons";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CustomCite from "../CustomCite";
import CustomCodeBlock from "../CustomCodeBlock";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import java from "highlight.js/lib/languages/java";
import py from "highlight.js/lib/languages/python";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import hljs from "highlight.js";

const lowlight = createLowlight();

lowlight.register("bash", bash);
lowlight.register("java", java);
lowlight.register("py", py);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("html", html);
lowlight.register("css", css);

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
        codeBlock: false,
        blockquote: {
          HTMLAttributes: {},
        },
      }),
      CustomCite,
      Link.configure({
        HTMLAttributes: {},
        openOnClick: false,
        autolink: false,
        defaultProtocol: "https",
      }),
      CustomImage,
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-base-green dark:bg-dark-base-green p-1",
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CustomCodeBlock);
        },
        renderHTML({ node, HTMLAttributes }) {
          let gen = hljs.highlight(node.textContent, {
            language: node.attrs.language || "javascript",
          }).value;
          let doc =
            typeof window !== "undefined" ? document : createHTMLDocument();
          let pre = doc.createElement("pre");
          let preAttrs = mergeAttributes(
            this.options.HTMLAttributes,
            HTMLAttributes
          );
          for (let key in preAttrs) {
            pre.setAttribute(key, preAttrs[key]);
          }
          let code = doc.createElement("code");
          if (node.attrs.language) {
            code.classList.add(
              this.options.languageClassPrefix + node.attrs.language
            );
          }
          pre.appendChild(code);
          code.innerHTML = gen;
          return pre as HTMLElement;
        },
      }).configure({ lowlight }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {},
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    // autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "[&_.resize-cursor] caret-base-neutral dark:caret-dark-base-neutral h-[500px] px-1 py-0.5 pr-3 w-full flex flex-col justify-start items-start overflow-x-hidden scrollbar dark:dark-scrollbar border-transparent outline-none [&_h3]:editor-heading [&_h3]:dark:editor-dark-heading [&_p]:editor-paragraph [&_p]:dark:editor-dark-paragraph [&_strong]:font-extrabold [&_ol]:editor-ordered-list [&_ol]:editor-list [&_ol]:dark:editor-dark-list [&_ul]:editor-unordered-list [&_ul]:editor-list [&_ul]:dark:editor-dark-list [&_a]:editor-link [&_blockquote]:editor-blockquote [&_blockquote]:dark:editor-dark-blockquote [&_cite]:editor-cite [&_cite]:dark:editor-dark-cite [&_.tableWrapper]:max-w-full [&_table]:editor-table [&_table]:dark:editor-dark-table [&_.react-renderer.node-codeBlock]:w-full",
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
        <ArticleEditorContent
          editor={editor}
          className="border border-base-200 dark:border-dark-base-border rounded transition-[outline] duration-200 outline-none outline-2 outline-transparent -outline-offset-2 focus-within:outline-blue-500 m-1 py-3 pl-4 pr-3"
        />
      </div>
    )
  );
};

export default ArticleEditor;
