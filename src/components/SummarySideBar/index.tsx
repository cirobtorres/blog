"use client";

import ArticleEditorTitle from "../ArticleEditorForm/ArticleEditorTitle";
import ArticleEditorSubtitle from "../ArticleEditorForm/ArticleEditorSubtitle";
import { IoClose } from "react-icons/io5";
import { useEffect, useReducer, useState } from "react";
import {
  ArticleDeleteButton,
  EditBodyButton,
  ArticleUpdateButton,
} from "../ArticleEditorForm/ArticleOnSubmitButton";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { calculateDaysDiff, formatDate } from "../../functions/formatDate";
import { MultiValue } from "react-select";
import { submitSummaryUpdate } from "@/lib/summary";

const initialState = {
  titleEmptyError: false,
  subtitleEmptyError: false,
};

interface ErrorState {
  titleEmptyError: boolean;
  subtitleEmptyError: boolean;
}

enum ErrorTypes {
  TITLE_EMPTY = "TITLE_EMPTY",
  SUBTITLE_EMPTY = "SUBTITLE_EMPTY",
}

interface ValidActions {
  type: ErrorTypes;
  payload: boolean;
}

const updateReducer = (state: ErrorState, action: ValidActions) => {
  switch (action.type) {
    case "TITLE_EMPTY":
      return { ...state, titleEmptyError: action.payload };
    case "SUBTITLE_EMPTY":
      return { ...state, subtitleEmptyError: action.payload };
    default:
      return state;
  }
};

interface Tag {
  value: string;
  label: string;
}

export default function SummarySideBar({
  summary,
  tags,
  isOpen,
  setIsOpen,
}: {
  summary: any;
  tags: { id: string; title: string }[] | null;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [errors, dispatchErrors] = useReducer(updateReducer, initialState);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const [tagVal, setTagVal] = useState<MultiValue<Tag>>([]);

  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    // event.preventDefault();
    setLoading(true);
    if (!title) {
      dispatchErrors({ type: ErrorTypes.TITLE_EMPTY, payload: true });
    } else {
      dispatchErrors({ type: ErrorTypes.TITLE_EMPTY, payload: false });
    }
    if (!subtitle) {
      dispatchErrors({ type: ErrorTypes.SUBTITLE_EMPTY, payload: true });
    } else {
      dispatchErrors({ type: ErrorTypes.SUBTITLE_EMPTY, payload: false });
    }
    if (!title || !subtitle) {
      setLoading(false);
      return;
    } else {
      await submitSummaryUpdate(id, title, subtitle);
    }
    // setLoading(false);
  };

  const handleDeleteSubmit = () => {};

  useEffect(() => {
    setId(summary.id);
    setTitle(summary.title);
    setSubtitle(summary.sub_title);
  }, [summary]);

  return (
    <>
      <div
        className={`z-50 fixed inset-0 transition-colors duration-200 ${
          isOpen
            ? "pointer-events-auto bg-black/35 dark:bg-blue-500/10"
            : "pointer-events-none bg-inherit"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`
        px-6 py-4 border-l border-base-border dark:border-dark-base-border z-50 fixed top-0 bottom-0 right-0 max-[550px]:w-full max-[900px]:w-[450px] w-[600px] scrollbar dark:dark-scrollbar overflow-y-auto transition-transform duration-1000  
        ${
          isOpen
            ? "translate-x-0"
            : "max-[550px]:translate-x-full max-[900px]:translate-x-[450px] translate-x-[600px]"
        } bg-base-100 dark:bg-dark-base-100
      `}
      >
        <form onSubmit={handleUpdateSubmit}>
          <div className="relative border-b border-base-border dark:border-dark-base-border pb-2 mb-4">
            <h1 className="text-3xl font-extrabold text-base-neutral dark:text-dark-base-neutral">
              Editar Artigo
            </h1>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`absolute top-1/2 -translate-y-[calc(50%_+_0.25rem)] right-0 transition-opacity duration-1000 cursor-pointer ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <IoClose className="text-3xl text-base-neutral dark:text-dark-base-neutral" />
            </button>
          </div>
          <ArticleEditorTitle
            id="article-title"
            text="Título"
            placeholder="Título do artigo"
            value={title}
            onChange={setTitle}
            errors={errors}
          />
          <ArticleEditorSubtitle
            id="article-subtitle"
            text="Subtítulo"
            placeholder="Texto do subheading do artigo"
            value={subtitle}
            onChange={setSubtitle}
            errors={errors}
          />
          <div className="border-b border-base-border dark:border-dark-base-border mt-4 mb-2 pb-2">
            <h2 className="font-extrabold text-xl text-base-neutral dark:text-dark-base-neutral">
              Texto do Artigo
            </h2>
          </div>
          <EditBodyButton path={`/painel/artigos/${summary.slug}/${id}`} />
          <div className="flex flex-col py-4">
            <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
              Última atualização: {formatDate(summary.updated_at)},{" "}
              {calculateDaysDiff(new Date(summary.updated_at))}
            </time>
            <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
              Criado: {formatDate(summary.created_at)},{" "}
              {calculateDaysDiff(new Date(summary.created_at))}
            </time>
          </div>
          <div className="flex justify-center gap-2 py-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-28 flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral border border-[#cacaca] dark:border-[#494949] bg-base-200 dark:bg-[#2c2c2c] hover:bg-[#e6e6e6] dark:hover:bg-[#292929] group" // w-full
            >
              <span className="relative transition-all duration-200 group-hover:translate-x-1">
                <MdKeyboardArrowLeft className="absolute top-1/2 -translate-y-1/2 -left-3 text-xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1.5" />
                Voltar
              </span>
            </button>
            <ArticleUpdateButton loading={loading} />
            <ArticleDeleteButton />
          </div>
        </form>
      </aside>
    </>
  );
}

const HelpText = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y border-base-border dark:border-dark-base-border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className={`flex-shrink-0 ${color}`}
      >
        <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
      {children}
    </div>
  );
};
