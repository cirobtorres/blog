"use client";

import Link from "next/link";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import {
  articleDelete,
  submitArticleCreate,
  submitArticleUpdate,
} from "@/lib/article";
import {
  ArticleDeleteButton,
  ArticleOnSubmitButton,
} from "./ArticleOnSubmitButton";
import ArticleEditor from "./ArticleEditor";
import CheckBox from "../CheckBox";
import ArticleEditorTitle from "./ArticleEditorTitle";
import ArticleEditorSubtitle from "./ArticleEditorSubtitle";
import RadioInput from "../RadioInput";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { SubmitConfirmationModal, DeleteConfirmationModal } from "../Modals";
import formatDate from "@/functions/formatDate";

const privateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36px"
      viewBox="0 -960 960 960"
      width="36px"
      className="fill-base-neutral dark:fill-dark-base-neutral"
    >
      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
    </svg>
  );
};

const publicIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36px"
      viewBox="0 -960 960 960"
      width="36px"
      className="fill-base-neutral dark:fill-dark-base-neutral"
    >
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
    </svg>
  );
};

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

const ArticleEditorCreateForm = ({
  blogUser,
}: {
  blogUser: { id: string; privileges: number };
}) => {
  const [errors, dispatchErrors] = useReducer(createReducer, initialState);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [radioVal, setRadioVal] = useState<"private" | "public">("private");
  const [checkVal, setCheckVal] = useState<"blocked" | "unblocked">(
    "unblocked"
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
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
    if (!title) {
      const heading = document.getElementById("article-title-top");
      heading?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
      return;
    } else if (!subtitle) {
      const heading = document.getElementById("article-subtitle-top");
      heading?.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
      return;
    } else {
      await submitArticleCreate(
        blogUser,
        title,
        subtitle,
        body,
        radioVal,
        checkVal
      );
      // TODO: Open FlashMessage
      router.push("/painel");
    }
    // setLoading(false);
  };

  return (
    <>
      <SubmitConfirmationModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        submitForm={handleSubmit}
        radioVal={radioVal}
        checkVal={checkVal}
        loading={loading}
        title="Deseja criar esse artigo?"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto my-4 flex flex-col items-center"
      >
        <div className="w-full flex flex-col gap-3">
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
          <div className="flex justify-center">
            <ArticleEditor onChange={setBody} />
          </div>
          <div className="flex justify-center max-[650px]:flex-col max-[650px]:items-start items-center gap-4 ml-1">
            <RadioInput
              id="private-radio"
              name="article-privacy"
              label="Privado"
              helpText="Mantenha o artigo em segredo."
              value={radioVal}
              checked="private"
              Icon={privateIcon}
              setValue={setRadioVal}
            />
            <RadioInput
              id="public-radio"
              name="article-privacy"
              label="Público"
              helpText="Publique o artigo globalmente."
              value={radioVal}
              checked="public"
              Icon={publicIcon}
              setValue={setRadioVal}
            />
          </div>
          <div className="flex justify-center max-[650px]:justify-start mb-3">
            <CheckBox
              id="block-replies"
              text="Bloquear comentários?"
              checked={checkVal === "blocked"}
              setValue={() =>
                setCheckVal(checkVal === "blocked" ? "unblocked" : "blocked")
              }
            />
          </div>
        </div>
        {radioVal === "private" && (
          <HelpText color="fill-base-yellow dark:fill-dark-base-yellow">
            <p className="text-xs text-base-yellow dark:text-dark-base-yellow">
              Seu artigo está marcado como{" "}
              <span className="font-extrabold">privado</span>. Artigos privados
              só podem ser lidos por você. Manter um artigo como privado é muito
              útil quando o artigo ainda não está finalizado, ou caso queiramos
              remover o conteúdo da internet sem a necessidade de deletá-lo para
              sempre da base de dados.
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
                Todas as modificações a esse artigo a partir de então exibirão o
                histórico de edições para todos os usuários
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
        <div className="w-full flex items-center gap-2 mt-3 text-center">
          <Link
            href="/painel"
            className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral border border-[#cacaca] dark:border-[#494949] bg-base-200 dark:bg-[#2c2c2c] hover:bg-[#e6e6e6] dark:hover:bg-[#292929] group"
          >
            <MdKeyboardArrowLeft className="text-xl opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
            <span className="transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
              Voltar
            </span>
          </Link>
          <ArticleOnSubmitButton
            modalConfirmation={setIsOpenModal}
            // loading={loading}
          />
        </div>
      </form>
    </>
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

const ArticleEditorUpdateForm = ({
  id,
  title: articleTitle,
  sub_title: articleSubTitle,
  body: articleBody,
  private: privateArticle,
  blocked_for_replies,
  updated_at,
  created_at,
}: {
  id: string;
  title: string;
  sub_title: string;
  body: string;
  private: boolean;
  blocked_for_replies: boolean;
  updated_at: string;
  created_at: string;
}) => {
  const [errors, dispatchErrors] = useReducer(updateReducer, initialState);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [title, setTitle] = useState(articleTitle);
  const [subtitle, setSubtitle] = useState(articleSubTitle);
  const [body, setBody] = useState(articleBody);
  const [radioVal, setRadioVal] = useState<"private" | "public">(
    privateArticle ? "private" : "public"
  );
  const [checkVal, setCheckVal] = useState<"blocked" | "unblocked">(
    blocked_for_replies ? "blocked" : "unblocked"
  );
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoadingUpdate(true);
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
    if (!title) {
      const heading = document.getElementById("article-title-top");
      heading?.focus();
      heading?.scrollIntoView({ behavior: "smooth" });
      setLoadingUpdate(false);
      return;
    } else if (!subtitle) {
      const subHeading = document.getElementById("article-subtitle-top");
      subHeading?.focus();
      subHeading?.scrollIntoView({ behavior: "smooth" });
      setLoadingUpdate(false);
      return;
    } else {
      await submitArticleUpdate(id, title, subtitle, body, radioVal, checkVal);
      // TODO: Open FlashMessage
      router.push("/painel");
    }
    // setLoadingUpdate(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    await articleDelete(id);
    // TODO: Open FlashMessage
    router.push("/painel");
    // setLoadingDelete(false);
  };

  return (
    <>
      <SubmitConfirmationModal
        isOpen={isOpenUpdateModal}
        setIsOpen={setIsOpenUpdateModal}
        submitForm={handleSubmit}
        radioVal={radioVal}
        checkVal={checkVal}
        loading={loadingUpdate}
        title="Deseja salvar esse artigo?"
      />
      <DeleteConfirmationModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        submitForm={handleDelete}
        loading={loadingDelete}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full my-4 flex flex-col items-center" // max-w-3xl mx-auto
      >
        <div className="w-full flex flex-col gap-3">
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
          <div className="flex justify-center">
            <ArticleEditor content={body} onChange={setBody} />
          </div>
          <div className="flex justify-center items-center gap-4 ml-1">
            <RadioInput
              id="private-radio"
              name="article-privacy"
              label="Privado"
              helpText="Mantenha o artigo em segredo."
              value={radioVal}
              checked="private"
              Icon={privateIcon}
              setValue={setRadioVal}
            />
            <RadioInput
              id="public-radio"
              name="article-privacy"
              label="Público"
              helpText="Publique o artigo globalmente."
              value={radioVal}
              checked="public"
              Icon={publicIcon}
              setValue={setRadioVal}
            />
          </div>
          <div className="flex justify-center mb-3">
            <CheckBox
              id="block-replies"
              text="Bloquear comentários?"
              checked={checkVal === "blocked"}
              setValue={() =>
                setCheckVal(checkVal === "blocked" ? "unblocked" : "blocked")
              }
            />
          </div>
        </div>
        <div className="flex gap-4">
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Atualizado: {formatDate(updated_at)}
          </time>
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Criado: {formatDate(created_at)}
          </time>
        </div>
        {radioVal === "private" && (
          <HelpText color="fill-base-yellow dark:fill-dark-base-yellow">
            <p className="text-xs text-base-yellow dark:text-dark-base-yellow">
              Seu artigo está marcado como{" "}
              <span className="font-extrabold">privado</span>. Artigos privados
              só podem ser lidos por você. Manter um artigo como privado é muito
              útil quando o artigo ainda não está finalizado, ou caso queiramos
              remover o conteúdo da internet sem a necessidade de deletá-lo para
              sempre da base de dados.
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
                Todas as modificações a esse artigo a partir de então exibirão o
                histórico de edições para todos os usuários
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
        <div className="w-full flex items-center gap-2 mt-3 text-center">
          <Link
            href="/painel"
            className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral border border-[#cacaca] dark:border-[#494949] bg-base-200 dark:bg-[#2c2c2c] hover:bg-[#e6e6e6] dark:hover:bg-[#292929] group"
          >
            <MdKeyboardArrowLeft className="text-xl opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
            <span className="transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
              Voltar
            </span>
          </Link>
          <ArticleDeleteButton modalConfirmation={setIsOpenDeleteModal} />
          <ArticleOnSubmitButton modalConfirmation={setIsOpenUpdateModal} />
        </div>
      </form>
    </>
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
    <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y-2 border-base-200 dark:border-dark-base-border">
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

export default ArticleEditorCreateForm;
export { ArticleEditorUpdateForm };
