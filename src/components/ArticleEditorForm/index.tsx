"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitArticleCreate, submitArticleUpdate } from "@/lib/article";
import ArticleOnSubmitButton from "./ArticleOnSubmitButton";
import ArticleEditor from "./ArticleEditor";
import CheckBox from "../CheckBox";
import ArticleEditorTitle from "./ArticleEditorTitle";
import ArticleEditorSubtitle from "./ArticleEditorSubtitle";
import RadioInput from "../RadioInput";
import ConfirmationModal from "../Modals";

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

const ArticleEditorCreateForm = ({
  blogUser,
}: {
  blogUser: { id: string; privileges: number };
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [radioVal, setRadioVal] = useState<"private" | "public">("private");
  const [checkVal, setCheckVal] = useState<"blocked" | "unblocked">(
    "unblocked"
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(!loading);
    await submitArticleCreate(
      blogUser,
      title,
      subtitle,
      body,
      radioVal,
      checkVal
    );
    setLoading(!loading);
    // TODO: Open FlashMessage
    router.push("/painel");
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        submitForm={handleSubmit}
        title="Deseja criar esse artigo?"
        helpText=""
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
          />
          <ArticleEditorSubtitle
            id="article-subtitle"
            text="Subtítulo"
            placeholder="Texto do subheading do artigo"
            value={subtitle}
            onChange={setSubtitle}
          />
          <div className="flex justify-center">
            <ArticleEditor onChange={setBody} />
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
        {radioVal === "private" && (
          <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y-2 border-base-200 dark:border-dark-base-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="flex-shrink-0 fill-base-yellow dark:fill-dark-base-yellow"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span className="text-xs text-base-yellow dark:text-dark-base-yellow">
              Seu artigo está marcado como <b>privado</b>. Artigos privados só
              podem ser lidos por você. Manter um artigo como privado é muito
              útil quando o artigo ainda não está finalizado, ou caso queiramos
              remover o conteúdo da internet sem a necessidade de deletá-lo para
              sempre da base de dados.
            </span>
          </div>
        )}
        {radioVal === "public" && (
          <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y-2 border-base-200 dark:border-dark-base-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="flex-shrink-0 fill-base-blue dark:fill-dark-base-blue"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span className="text-xs text-base-blue dark:text-dark-base-blue">
              Seu artigo está marcado como <b>público</b>. Clicando em salvar,
              você estará publicando seu artigo na internet para que todos
              possam lê-lo. Certifique-se de que você tenha uma versão final
              desse artigo.{" "}
              <b>
                Todas as modificações a esse artigo a partir de então exibirão o
                histórico de edições para todos os usuários
              </b>
              .
            </span>
          </div>
        )}
        <div className="mt-4 text-center">
          <ArticleOnSubmitButton
            modalConfirmation={setIsOpenModal}
            loading={loading}
          />
        </div>
      </form>
    </>
  );
};

const ArticleEditorUpdateForm = ({
  id,
  title: articleTitle,
  sub_title: articleSubTitle,
  body: articleBody,
  private: privateArticle,
  blocked_for_replies,
}: {
  id: string;
  title: string;
  sub_title: string;
  body: string;
  private: boolean;
  blocked_for_replies: boolean;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState(articleTitle);
  const [subtitle, setSubtitle] = useState(articleSubTitle);
  const [body, setBody] = useState(articleBody);
  const [radioVal, setRadioVal] = useState<"private" | "public">(
    privateArticle ? "private" : "public"
  );
  const [checkVal, setCheckVal] = useState<"blocked" | "unblocked">(
    blocked_for_replies ? "blocked" : "unblocked"
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(!loading);
    await submitArticleUpdate(id, title, subtitle, body, radioVal, checkVal);
    setLoading(!loading);
    // TODO: Open FlashMessage
    router.push("/painel");
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        submitForm={handleSubmit}
        title="Deseja salvar esse artigo?"
        helpText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloribus quam praesentium provident laborum labore sequi autem a recusandae? Voluptate deserunt vel corporis, debitis est suscipit consectetur nulla tempore at.Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloribus quam praesentium provident laborum labore sequi autem a recusandae? Voluptate deserunt vel corporis, debitis est suscipit consectetur nulla tempore at."
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
          />
          <ArticleEditorSubtitle
            id="article-subtitle"
            text="Subtítulo"
            placeholder="Texto do subheading do artigo"
            value={subtitle}
            onChange={setSubtitle}
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
        {radioVal === "private" && (
          <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y-2 border-base-200 dark:border-dark-base-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="flex-shrink-0 fill-base-yellow dark:fill-dark-base-yellow"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span className="text-xs text-base-yellow dark:text-dark-base-yellow">
              Seu artigo está marcado como <b>privado</b>. Artigos privados só
              podem ser lidos por você. Manter um artigo como privado é muito
              útil quando o artigo ainda não está finalizado, ou caso queiramos
              remover o conteúdo da internet sem a necessidade de deletá-lo para
              sempre da base de dados.
            </span>
          </div>
        )}
        {radioVal === "public" && (
          <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y-2 border-base-200 dark:border-dark-base-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="flex-shrink-0 fill-base-blue dark:fill-dark-base-blue"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span className="text-xs text-base-blue dark:text-dark-base-blue">
              Seu artigo está marcado como <b>público</b>. Clicando em salvar,
              você estará publicando seu artigo na internet para que todos
              possam lê-lo. Certifique-se de que você tenha uma versão final
              desse artigo.{" "}
              <b>
                Todas as modificações a esse artigo a partir de então exibirão o
                histórico de edições para todos os usuários
              </b>
              .
            </span>
          </div>
        )}
        <div className="mt-4 text-center">
          <ArticleOnSubmitButton
            modalConfirmation={setIsOpenModal}
            loading={loading}
          />
        </div>
      </form>
    </>
  );
};

export default ArticleEditorCreateForm;
export { ArticleEditorUpdateForm };
