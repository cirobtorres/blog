"use client";

import useArticleSideBar from "@/hooks/useArticleSideBar";
import RadioInput from "../RadioInput";
import CheckBox from "../CheckBox";
import ArticleEditorTitle from "../ArticleEditorForm/ArticleEditorTitle";
import ArticleEditorSubtitle from "../ArticleEditorForm/ArticleEditorSubtitle";
import { FaGlobeAmericas, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useReducer, useState } from "react";
import {
  ArticleDeleteButton,
  ArticleEditBodyButton,
  ArticleUpdateButton,
} from "../ArticleEditorForm/ArticleOnSubmitButton";
import { MdKeyboardArrowLeft } from "react-icons/md";
import formatDate from "../../functions/formatDate";
import { submitArticleUpdate } from "../../lib/article";
import useFlashMessage from "../../hooks/useFlashMessage";

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

export default function ArticleSideBar() {
  const [loading, setLoading] = useState(false);
  const [errors, dispatchErrors] = useReducer(updateReducer, initialState);

  const {
    isOpen,
    setIsOpen,
    id,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    slug,
    updatedAt,
    createdAt,
    privateArticle,
    blockedForReplies,
  } = useArticleSideBar();

  const [radioVal, setRadioVal] = useState<"private" | "public">(
    privateArticle ? "private" : "public"
  );

  const [checkVal, setCheckVal] = useState<"blocked" | "unblocked">(
    blockedForReplies ? "blocked" : "unblocked"
  );

  const { setShow, setLabel, setType } = useFlashMessage();

  const handleUpdateSubmit = async () => {
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
      await submitArticleUpdate(id, title, subtitle, radioVal, checkVal);
      // TODO: Open FlashMessage
      setShow(true);
      setLabel("Artigo salvo com sucesso!");
      setType("success");
    }
    // setLoading(false);
  };

  const handleDeleteSubmit = () => {};

  return (
    <>
      <div
        className={`z-50 fixed inset-0 transition-colors duration-200 ${
          isOpen
            ? "pointer-events-auto bg-blue-500/10"
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
          <ArticleEditBodyButton id={id} slug={slug} />
          <div className="flex flex-col py-4 gap-4 ml-1">
            <RadioInput
              id="private-radio"
              name="article-privacy"
              label="Privado"
              helpText="Mantenha o artigo em segredo."
              value={radioVal}
              checked="private"
              Icon={FaLock}
              setValue={setRadioVal}
            />
            <RadioInput
              id="public-radio"
              name="article-privacy"
              label="Público"
              helpText="Publique o artigo globalmente."
              value={radioVal}
              checked="public"
              Icon={FaGlobeAmericas}
              setValue={setRadioVal}
            />
          </div>
          <div className="flex my-4">
            <CheckBox
              id="block-replies"
              text="Bloquear comentários?"
              checked={checkVal === "blocked"}
              setValue={() =>
                setCheckVal(checkVal === "blocked" ? "unblocked" : "blocked")
              }
            />
          </div>
          <div className="flex flex-col py-4">
            <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
              Atualizado: {formatDate(updatedAt)}
            </time>
            <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
              Criado: {formatDate(createdAt)}
            </time>
          </div>
          {radioVal === "private" && (
            <HelpText color="fill-base-yellow dark:fill-dark-base-yellow">
              <p className="text-xs text-base-yellow dark:text-dark-base-yellow">
                Seu artigo está marcado como{" "}
                <span className="font-extrabold">privado</span>. Artigos
                privados só podem ser lidos por você. Manter um artigo como
                privado é muito útil quando o artigo ainda não está finalizado,
                ou caso queiramos remover o conteúdo da internet sem a
                necessidade de deletá-lo para sempre da base de dados.
              </p>
            </HelpText>
          )}
          {radioVal === "public" && (
            <HelpText color="fill-base-blue dark:fill-dark-base-blue">
              <p className="text-xs text-base-blue dark:text-dark-base-blue">
                Seu artigo está marcado como{" "}
                <span className="font-extrabold">público</span>. Clicando em
                salvar, você estará publicando seu artigo na internet para que
                todos possam lê-lo. Certifique-se de que você tenha uma versão
                final desse artigo.{" "}
                <span className="font-extrabold">
                  Todas as modificações a esse artigo a partir de então exibirão
                  o histórico de edições para todos os usuários
                </span>
                .
              </p>
            </HelpText>
          )}
          {checkVal === "blocked" && (
            <HelpText color="fill-base-red dark:fill-dark-base-red">
              <p className="text-xs text-base-red dark:text-dark-base-red">
                Os comentários desse artigo estão{" "}
                <span className="font-extrabold">bloqueados</span> por você.
              </p>
            </HelpText>
          )}
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
