"use client";

import Link from "@tiptap/extension-link";
import {
  EditorContent as ArticleEditorContent,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  useEditor,
} from "@tiptap/react";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import { Node, mergeAttributes } from "@tiptap/core";
import { createHTMLDocument } from "zeed-dom";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CustomImage from "../CustomImage";
import Loading from "../../Loading";
import ArticleEditorButtons from "../ArticleEditorButtons";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import hljs from "highlight.js";

const lowlight = createLowlight();

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

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

function CodeBlock() {
  return (
    <NodeViewWrapper>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}

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
          class: "bg-base-green dark:bg-dark-base-green p-1",
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
        renderHTML({ node, HTMLAttributes }) {
          let gen = hljs.highlight(node.textContent, {
            language: node.attrs.language,
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
          "[&_.resize-cursor] caret-base-neutral dark:caret-dark-base-neutral h-[500px] w-full py-3 px-4 flex flex-col justify-start items-start overflow-x-hidden border-2 border-base-200 dark:border-dark-base-border rounded-xl scrollbar dark:dark-scrollbar transition-[outline] duration-200 outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 [&_h3]:editor-heading [&_h3]:dark:editor-dark-heading [&_p]:editor-paragraph [&_p]:dark:editor-dark-paragraph [&_strong]:font-extrabold [&_ol]:editor-ordered-list [&_ol]:editor-list [&_ol]:dark:editor-dark-list [&_ul]:editor-unordered-list [&_ul]:editor-list [&_ul]:dark:editor-dark-list [&_a]:editor-link [&_blockquote]:editor-blockquote [&_blockquote]:dark:editor-dark-blockquote [&_cite]:editor-cite [&_cite]:dark:editor-dark-cite [&_.tableWrapper]:max-w-full [&_table]:editor-table [&_table]:dark:editor-dark-table [&_.react-renderer.node-codeBlock]:w-full",
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
