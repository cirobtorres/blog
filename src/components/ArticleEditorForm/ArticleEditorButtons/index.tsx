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
  FaMinus,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import { Editor } from "@tiptap/core";
import { useCallback } from "react";
import {
  BsTable,
  BsArrowBarLeft,
  BsArrowBarRight,
  BsArrowBarDown,
  BsArrowBarUp,
  BsArrowsCollapse,
  BsArrowsExpand,
} from "react-icons/bs";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { AiOutlineDeleteColumn, AiOutlineDeleteRow } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { GoSquareFill } from "react-icons/go";
import { TbNumber1Small, TbNumber2Small } from "react-icons/tb";
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
              z-50 transition-opacity duration-200 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
      >
        <FaHighlighter
          className={`${
            editor.isActive("highlight")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Realçar" />
      </button>
      {/*------------------------------HeadingButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 })
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
      >
        <TbNumber1Small
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } absolute bottom-1 right-0 transition-colors duration-300
        `}
        />
        <FaHeading
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Heading 3" />
      </button>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 })
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
      >
        <TbNumber2Small
          className={`${
            editor.isActive("heading", { level: 4 })
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } absolute bottom-1 right-0 transition-colors duration-300
        `}
        />
        <FaHeading
          className={`${
            editor.isActive("heading", { level: 4 })
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Heading 4" />
      </button>
      {/*------------------------------LinkReference------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={setLink}
        className={`${
          editor.isActive("link")
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
        className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 hover:bg-base-200 dark:hover:bg-dark-base-150 group"
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
      {/*------------------------------CodeBlockButton------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock")
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
      {/*------------------------------Blockquote------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote")
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
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
            ? "bg-base-200 dark:bg-dark-base-150"
            : "hover:bg-base-200 dark:hover:bg-dark-base-150"
        } relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group`}
      >
        <FaMinus
          className={`${
            editor.isActive("cite")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Autor" />
      </button>
      {/*------------------------------Table------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => {
          if (!editor.isActive("table"))
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
        }}
        className={`
          ${
            editor.isActive("table")
              ? "bg-base-200 dark:bg-dark-base-150"
              : "hover:bg-base-200 dark:hover:bg-dark-base-150"
          }
          relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group
        `}
      >
        <BsTable
          className={`${
            editor.isActive("table")
              ? "text-base-green dark:text-dark-base-green"
              : "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
          } transition-colors duration-300
        `}
        />
        <Balloon text="Criar tabela" />
      </button>
      {editor.isActive("table") && (
        <div className="relative flex gap-0.5 px-0.5 rounded-xl bg-base-200 dark:bg-dark-base-200">
          <div className="h-4 absolute w-full -top-[25%] left-1/2 -translate-x-1/2">
            <hr className="w-full border-base-border dark:border-dark-base-border" />
            <span className="absolute -top-1/2 left-1/2 -translate-x-1/2 text-xs text-base-neutral dark:text-dark-base-neutral bg-base-100 dark:bg-dark-base-100">
              Tabela
            </span>
          </div>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsTable
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            <IoMdCloseCircle
              className={`${
                editor.isActive("table")
                  ? "text-red-500"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } text-xs absolute top-[3px] right-[3px]`}
            />
            {editor.isActive("table") && <Balloon text="Deletar tabela" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowBarLeft
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && (
              <Balloon text="Criar coluna à esquerda" />
            )}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowBarRight
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && (
              <Balloon text="Criar coluna à direita" />
            )}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <AiOutlineDeleteColumn
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } text-xl transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Deletar coluna" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowBarDown
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Criar linha acima" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowBarUp
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Criar linha abaixo" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <AiOutlineDeleteRow
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Deletar linha" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowsCollapse
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Unir células" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <BsArrowsExpand
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && <Balloon text="Separar células" />}
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            disabled={!editor.isActive("table")}
            className="relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group"
          >
            <GoSquareFill
              className={`${
                editor.isActive("table")
                  ? "text-base-neutral dark:text-dark-base-neutral group-hover:text-base-green dark:group-hover:text-dark-base-green"
                  : "text-base-placeholder dark:text-dark-base-placeholder"
              } transition-colors duration-300
        `}
            />
            {editor.isActive("table") && (
              <Balloon text="Tornar célula cabeçalho" />
            )}
          </button>
        </div>
      )}
      {/*------------------------------UndoRedo------------------------------*/}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={`
          ${
            !editor.can().undo()
              ? ""
              : "hover:bg-base-200 dark:hover:bg-dark-base-150"
          }
          relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group
        `}
      >
        <FaUndo
          className={`
          ${
            !editor.can().undo()
              ? "text-base-placeholder dark:text-dark-base-placeholder"
              : "group-hover:text-base-green dark:group-hover:text-dark-base-green"
          }
          transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral 
        `}
        />
        {editor.can().undo() && <Balloon text="Desfazer" />}
      </button>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={`
          ${
            !editor.can().redo()
              ? ""
              : "hover:bg-base-200 dark:hover:bg-dark-base-150"
          }
          relative flex justify-center items-center size-10 rounded-xl transition-colors duration-300 group
        `}
      >
        <FaRedo
          className={`
          ${
            !editor.can().redo()
              ? "text-base-placeholder dark:text-dark-base-placeholder"
              : "group-hover:text-base-green dark:group-hover:text-dark-base-green"
          }
          transition-colors duration-300 text-base-neutral dark:text-dark-base-neutral 
        `}
        />
        {editor.can().redo() && <Balloon text="Refazer" />}
      </button>
    </>
  );
};

export default ArticleEditorButtons;
