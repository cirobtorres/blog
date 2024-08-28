"use client";

import { EditorContent } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaImages,
  FaHeading,
  FaList,
  FaListOl,
  FaCode,
  FaHighlighter,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { FaPaperclip, FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { RiLayoutLeft2Fill, RiLayoutTop2Fill } from "react-icons/ri";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import CodeBlock from "@tiptap/extension-code-block";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { useState } from "react";

const content = `
  <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero.</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <b>Dolor quasi ex magni</b>, sapiente adipisci temporibus quidem animi dolorem incidunt laborum! <u>Neque reprehenderit nihil blanditiis quaerat dignissimos</u> hic corporis porro ut amet atque. Tenetur atque nisi asperiores est? Aliquam, magni laborum.</p>
  <ul>
  <li>Hello world 1</li>
  <li>Hello world 2</li>
  <li>Hello world 3</li>
  </ul>
  <img src="https://www.worldhistory.org/uploads/images/13632.jpg" contenteditable="false" draggable="true" class="ProseMirror-selectednode">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <b>Sapiente fugit ipsum sunt</b> earum adipisci nemo, rem natus deserunt quam quos autem itaque unde voluptatem sequi.</p>
  <h3>Lorem ipsum dolor sit.</h3>
  <ol>
  <li>Lorem ipsum dolor sit amet consectetur.</li>
  <li>Lorem ipsum dolor sit.</li>
  <li><b>Lorem ipsum dolor sit amet</b> consectetur adipisicing.</li>
  <li>Lorem ipsum dolor sit amet.</li>
  <li><i>Lorem ipsum dolor sit amet consectetur.</i></li>
  </ol>
  <h3>Lorem ipsum dolor sit amet consectetur.</h3>
  <pre>
  <code>for(let i = 0; i < 10; i++) {
    console.log(i);
  }</code>
  </pre>
  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <mark class="article-editor-highlight">Eos tempore eaque quo hic impedit ad, possimus quibusdam exercitationem?</mark> <i>Illum similique earum dolore illo minima sed sequi <b>commodi blanditiis</b> magnam optio exercitationem</i>, <s>unde reiciendis nobis id distinctio voluptates quos vel</s>, neque harum vitae possimus eveniet ducimus aliquam? Vero ullam ea dicta veniam id? Tempora, beatae incidunt.</p>
`;

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const Tiptap = () => {
  const editor = new Editor({
    // element: document.querySelector(".element") || undefined,
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: "article-editor-heading",
        },
        levels: [3],
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "article-editor-bold",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "article-editor-highlight",
        },
      }),
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "article-editor-bullet-list",
        },
        itemTypeName: "listItem",
        keepMarks: true,
        keepAttributes: true,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "article-editor-ordered-list",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "article-editor-code-block",
        },
        exitOnArrowDown: true,
        languageClassPrefix: "language-javascript",
      }),
      Image,
    ],
    autofocus: true,
    editable: true,
    injectCSS: false,
    editorProps: {
      attributes: {
        class:
          "w-full h-full min-h-96 flex flex-col gap-3 px-8 pt-6 pb-16 justify-start items-start outline-none text-xl text-base-neutral dark:text-dark-base-neutral bg-base-100 dark:bg-dark-base-200",
      },
    },
    content,
  });

  const [flexDirection, setFlexDirection] = useState<FlexDirection>("column");

  const BoldButton = () => {
    return (
      <button
        onClick={(event) => {
          event.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={`${
          editor.isActive("bold")
            ? "bg-base-100 dark:bg-dark-base-100 group/bold-active"
            : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaBold className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group/bold-active:text-base-green group-hover/bold-active:dark:text-dark-base-green group-hover:text-base-green-hover dark:group-hover:text-dark-base-green-hover" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Negrito
        </p>
      </button>
    );
  };

  const ItalicButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaItalic className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Itálico
        </p>
      </button>
    );
  };

  const UnderlineButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaUnderline className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Sublinhar
        </p>
      </button>
    );
  };

  const StrikeThrough = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaStrikethrough className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Riscar
        </p>
      </button>
    );
  };

  const LinkReference = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        {/*Link*/}
        <FaPaperclip className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Hiperlink
        </p>
      </button>
    );
  };

  const HighlightButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`${
          editor.isActive("highlight") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaHighlighter className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Realçar
        </p>
      </button>
    );
  };

  const PostImage = () => {
    const addImage = () => {
      const url = window.prompt("URL");

      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };

    return (
      <button
        onClick={addImage}
        className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group"
      >
        <FaImages className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2
              before:border-8 before:border-b-0 before:border-transparent
              before:border-t-base-300 before:dark:border-t-dark-base-150
           `}
        >
          Imagem
        </p>
      </button>
    );
  };

  const HeadingButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaHeading className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Heading
        </p>
      </button>
    );
  };

  const UnorderedListButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaList className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Lista não ordenada
        </p>
      </button>
    );
  };

  const OrderedListButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaListOl className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Lista ordenada
        </p>
      </button>
    );
  };

  const Quote = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("bold") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaQuoteLeft className="absolute top-[30%] left-[20%] text-xs transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <FaQuoteRight className="absolute bottom-[30%] right-[20%] text-xs transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Citar
        </p>
      </button>
    );
  };

  const CodeBlockButton = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaCode className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Code
        </p>
      </button>
    );
  };

  const Table = () => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "is-active" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <IoGrid className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Tabela
        </p>
      </button>
    );
  };

  const ToggleColumn = () => {
    return (
      <button
        onClick={() => setFlexDirection("column")}
        className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group"
      >
        <RiLayoutTop2Fill className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Ferramentas: topo
        </p>
      </button>
    );
  };

  const ToggleRow = () => {
    return (
      <button
        onClick={() => setFlexDirection("row")}
        className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group"
      >
        <RiLayoutLeft2Fill className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <p
          className={`
              transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none 
              absolute bottom-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
              text-base-neutral dark:text-dark-base-neutral bg-base-300 dark:bg-dark-base-150 
              before:w-0 before:h-0 before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 
              before:border-8 before:border-b-0 before:border-transparent 
              before:border-t-base-300 before:dark:border-t-dark-base-150 
           `}
        >
          Ferramentas: lateral
        </p>
      </button>
    );
  };

  return (
    <div className="flex max-w-5xl" style={{ flexDirection }}>
      <div
        className="flex justify-between gap-1 p-4 rounded-tl-3xl border-b bg-base-200 dark:bg-dark-base-300 border-base-200 dark:border-transparent"
        style={{
          flexDirection: flexDirection === "row" ? "column" : "row",
          borderTopRightRadius: flexDirection === "row" ? "" : "1.5rem",
          borderBottomLeftRadius: flexDirection === "row" ? "1.5rem" : "",
        }}
      >
        <div
          className="flex"
          style={{
            flexDirection: flexDirection === "row" ? "column" : "row",
          }}
        >
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <StrikeThrough />
          <HighlightButton />
          <HeadingButton />
          <LinkReference />
          <PostImage />
          <UnorderedListButton />
          <OrderedListButton />
          <Quote />
          <CodeBlockButton />
          <Table />
        </div>
        {flexDirection === "row" && <ToggleColumn />}
        {flexDirection === "column" && <ToggleRow />}
      </div>
      <EditorContent
        editor={editor}
        className="w-full h-full border border-base-200 dark:border-transparent"
      />
    </div>
  );
};

export default Tiptap;
