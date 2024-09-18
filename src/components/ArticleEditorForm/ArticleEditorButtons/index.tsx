"use client";

import {
  FaBold,
  FaItalic,
  FaLink,
  FaStrikethrough,
  FaImages,
  FaHeading,
  FaList,
  FaListOl,
  FaCode,
  FaHighlighter,
} from "react-icons/fa";
import { Editor } from "@tiptap/core";
import { useCallback } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { BsChatSquareQuoteFill } from "react-icons/bs";

const ArticleEditorButtons = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) {
      return null;
    }
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) {
      return null;
    }
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }

    return;
  }, [editor]);

  if (!editor) {
    return null;
  }

  const Balloon = ({ text }: { text: string }) => {
    return (
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
        {text}
      </p>
    );
  };

  return (
    <>
      {/*------------------------------Bold------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        className={`${
          editor.isActive("bold")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaBold
          className={`${
            editor.isActive("bold")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Negrito" />
      </button>
      {/*------------------------------Italic------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaItalic
          className={`${
            editor.isActive("italic")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Itálico" />
      </button>
      {/*------------------------------StrikeThrough------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaStrikethrough
          className={`${
            editor.isActive("strike")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Riscar" />
      </button>
      {/*------------------------------HighlightButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`${
          editor.isActive("highlight")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaHighlighter
          className={`${
            editor.isActive("highlight")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
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
      {/*------------------------------HeadingButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 })
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaHeading
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Heading" />
      </button>
      {/*------------------------------LinkReference------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={setLink}
        className={`${
          editor.isActive("link") ? "bg-base-100 dark:bg-dark-base-150" : ""
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaLink
          className={`transition-colors duration-300 ${
            editor.isActive("link")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          }`}
        />
        <Balloon text="Hiperlink" />
      </button>
      {/*------------------------------PostImage------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={addImage}
        className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group"
      >
        <FaImages className="transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green" />
        <Balloon text="Imagem" />
      </button>
      {/*------------------------------UnorderedListButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaList
          className={`${
            editor.isActive("bulletList")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Lista não ordenada" />
      </button>
      {/*------------------------------OrderedListButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaListOl
          className={`${
            editor.isActive("orderedList")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Lista ordenada" />
      </button>
      {/*------------------------------Blockquote------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaQuoteLeft
          className={`${
            editor.isActive("blockquote")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } absolute top-[30%] left-[20%] text-xs transition-colors duration-300`}
        />
        <FaQuoteRight
          className={`${
            editor.isActive("blockquote")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } absolute bottom-[30%] right-[20%] text-xs transition-colors duration-300`}
        />
        <Balloon text="Citação" />
      </button>
      {/*------------------------------Cite------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().setNode("cite").run()}
        className={`${
          editor.isActive("cite")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <BsChatSquareQuoteFill
          className={`${
            editor.isActive("cite")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Autor" />
      </button>
      {/*------------------------------CodeBlockButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock")
            ? "bg-base-100 dark:bg-dark-base-150"
            : "hover:bg-base-100 dark:hover:bg-dark-base-100"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-150 dark:hover:bg-dark-base-150 group`}
      >
        <FaCode
          className={`${
            editor.isActive("codeBlock")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Code" />
      </button>
    </>
  );
};

export default ArticleEditorButtons;
