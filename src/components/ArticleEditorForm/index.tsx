"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitArticleBodyUpdate } from "@/lib/article";
import {
  ArticleUpdateButton,
  ReturnButton,
  SummaryCreateButton,
  SummaryUpdateButton,
} from "./ArticleOnSubmitButton";
import ArticleEditor from "./ArticleEditor";
import { useFormState } from "react-dom";
import { submitSummaryCreate, submitSummaryUpdate } from "@/lib/summary";

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

const createReducer = (state: ErrorState, action: ValidActions) => {
  switch (action.type) {
    case "TITLE_EMPTY":
      return { ...state, titleEmptyError: action.payload };
    case "SUBTITLE_EMPTY":
      return { ...state, subtitleEmptyError: action.payload };
    default:
      return state;
  }
};

const CreateSummary = ({
  blogUser,
}: {
  blogUser: { id: string; privileges: number };
}) => {
  const [state, action] = useFormState<State, FormData>(submitSummaryCreate, {
    errors: null,
  });

  return (
    <div className="w-full">
      <div className="pb-2 mb-4 border-b border-base-border dark:border-dark-base-border">
        <h1 className="font-extrabold text-3xl text-base-neutral dark:text-dark-base-neutral">
          Criar Rascunho
        </h1>
      </div>
      <form action={action} className="">
        <input type="hidden" name="blog-author" value={blogUser.id} />
        <div className="w-full h-full">
          <ArticleTitle id="summary-title" label="Título" placeholder="" />
          <ArticleSubTitle
            id="summary-subtitle"
            label="Subtítulo"
            placeholder=""
          />
          <div className="flex justify-center items-center gap-2 mt-4">
            <ReturnButton href="/painel/rascunhos" />
            <SummaryCreateButton />
          </div>
        </div>
      </form>
    </div>
  );
};

const EditSummary = ({ id, content }: { id: string; content: string }) => {
  const [body, setBody] = useState(content);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    await submitSummaryUpdate(id, body);
    // TODO: Open FlashMessage
    router.push("/painel/rascunhos");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-4 flex flex-col items-center" // max-w-3xl mx-auto
    >
      <div className="w-full flex justify-center">
        <ArticleEditor content={body} onChange={setBody} />
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-3">
        <ReturnButton href="/painel/rascunhos" />
        <SummaryUpdateButton loading={loading} />
      </div>
    </form>
  );
};

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

const EditArticle = ({
  id,
  body: articleBody,
}: {
  id: string;
  body: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState(articleBody);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    await submitArticleBodyUpdate(id, body);
    // TODO: Open FlashMessage
    router.push("/painel");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-4 flex flex-col items-center" // max-w-3xl mx-auto
    >
      <div className="w-full flex justify-center">
        <ArticleEditor content={body} onChange={setBody} />
      </div>
      <div className="w-full flex justify-center items-center gap-2 mt-3">
        <ReturnButton href="/painel" />
        <ArticleUpdateButton loading={loading} />
      </div>
    </form>
  );
};

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

const ArticleTitle = ({
  id,
  label,
  placeholder,
  errors,
}: {
  id: string;
  label: string;
  placeholder: string;
  errors?: State;
}) => {
  return (
    <div
      id={`${id}-top`}
      className={`
      w-full flex flex-col justify-start items-start overflow-hidden 
      text-base-neutral dark:text-dark-base-neutral 
      outline-none border-none 
    `}
    >
      <label
        htmlFor={id}
        className="w-full cursor-pointer font-extrabold text-xl p-2 pl-0"
      >
        {label}
      </label>
      <input
        id={id}
        maxLength={115}
        name={id}
        placeholder={placeholder}
        className={`resize-none overflow-hidden w-full h-full border ${
          errors?.titleEmptyError
            ? "border-base-red dark:border-dark-base-red"
            : "border-base-border dark:border-dark-base-border focus:outline-blue-500"
        } rounded p-2 transition-[outline] duration-200 outline-none outline-2 outline-transparent -outline-offset-2 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder 
      `}
      />
      {errors?.titleEmptyError && (
        <p className="mt-2 ml-2 text-xs text-base-red dark:text-dark-base-red">
          O campo <span className="font-extrabold">Título</span> é obrigatório!
        </p>
      )}
    </div>
  );
};

const ArticleSubTitle = ({
  id,
  label,
  placeholder,
  errors,
}: {
  id: string;
  label: string;
  placeholder: string;
  errors?: State;
}) => {
  return (
    <div
      id={`${id}-top`}
      className={`
      w-full flex flex-col justify-start items-start overflow-hidden 
      text-base-neutral dark:text-dark-base-neutral 
      outline-none border-none 
    `}
    >
      <label
        htmlFor={id}
        className="w-full cursor-pointer font-extrabold text-xl p-2 pl-0"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={2}
        maxLength={115}
        name={id}
        placeholder={placeholder}
        className={`resize-none overflow-hidden w-full h-full border ${
          errors?.titleEmptyError
            ? "border-base-red dark:border-dark-base-red"
            : "border-base-border dark:border-dark-base-border focus:outline-blue-500"
        } rounded p-2 transition-[outline] duration-200 outline-none outline-2 outline-transparent -outline-offset-2 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder 
      `}
      />
      {errors?.titleEmptyError && (
        <p className="mt-2 ml-2 text-xs text-base-red dark:text-dark-base-red">
          O campo <span className="font-extrabold">Título</span> é obrigatório!
        </p>
      )}
    </div>
  );
};

export default CreateSummary;
export { EditArticle, EditSummary, ArticleTitle, ArticleSubTitle };
