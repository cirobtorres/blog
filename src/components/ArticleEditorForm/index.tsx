"use client";

import ArticleOnSubmitButton from "./ArticleOnSubmitButton";
import ArticleEditor from "./ArticleEditor";
import { useState } from "react";
import { submitArticle } from "../../lib/article";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import CheckBox from "../CheckBox";

const ArticleEditorLabel = ({
  id,
  text,
  value,
  onChange,
  placeholder = "",
}: {
  id: string;
  text: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div
      className={`
      w-full h-full flex flex-col justify-start items-start overflow-hidden 
      text-base-neutral dark:text-dark-base-neutral 
      outline-none border-none 
    `}
    >
      <label
        htmlFor={id}
        className="w-full cursor-pointer font-extrabold text-xl p-2"
      >
        {text}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full h-full border-2 border-base-200 dark:border-dark-base-border rounded-xl p-2 outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
      />
    </div>
  );
};

const SubArticleEditorLabel = ({
  id,
  text,
  value,
  onChange,
  placeholder = "",
}: {
  id: string;
  text: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div
      className={`
      w-full h-full flex flex-col justify-start items-start overflow-hidden 
      text-base-neutral dark:text-dark-base-neutral 
      outline-none border-none 
    `}
    >
      <label
        htmlFor={id}
        className="w-full cursor-pointer font-extrabold text-xl p-2"
      >
        {text}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={2}
        placeholder={placeholder}
        className="w-full h-full border-2 border-base-200 dark:border-dark-base-border rounded-xl p-2 outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
      />
    </div>
  );
};

const RadioInput = ({
  id,
  name,
  label,
  helpText,
  Icon,
  onChange,
  defaultChecked = false,
}: {
  id: string;
  name: string;
  label: string;
  helpText: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onChange: (value: string) => void;
  defaultChecked?: boolean;
}) => {
  const handleOnChange = () => {
    onChange(id);
  };
  return (
    <div className="flex items-center gap-4">
      <input
        type="radio"
        name={name}
        id={id}
        onChange={handleOnChange}
        defaultChecked={defaultChecked}
        className="hidden peer"
      />
      <div className="relative size-4 rounded-full outline outline-2 outline-offset-2 outline-base-neutral dark:outline-dark-base-neutral peer-checked:[&_div]:size-full overflow-hidden ">
        <div className="transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-0 rounded-full bg-base-green dark:bg-dark-base-green" />
      </div>
      <label htmlFor={id} className="flex items-center gap-4 cursor-pointer">
        <Icon />
        <p className="flex flex-col text-base-neutral dark:text-dark-base-neutral">
          <span className="font-extrabold text-base-green dark:text-dark-base-green">
            {label}
          </span>
          <span className="text-xs">{helpText}</span>
        </p>
      </label>
    </div>
  );
};

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

const ArticleEditorForm = ({
  blogUser,
}: {
  blogUser: { id: string; privileges: number };
}) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [privateArticle, setPrivateArticle] = useState("private-radio");
  // const [blockReplies, setBlockReplies] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = await submitArticle(blogUser, title, subtitle, body);
    if (form) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto my-4 flex flex-col items-center"
    >
      <div className="w-full flex flex-col gap-3">
        <ArticleEditorLabel
          id="article-title"
          text="Título"
          value={title}
          onChange={setTitle}
          placeholder="Título do artigo"
        />
        <SubArticleEditorLabel
          id="article-subtitle"
          text="Subtítulo"
          value={subtitle}
          onChange={setSubtitle}
          placeholder="Texto do subheading do artigo"
        />
        <div className="flex justify-center">
          <ArticleEditor onChange={setBody} />
        </div>
        <div className="flex justify-center items-center gap-4 ml-1">
          <RadioInput
            id="private-radio"
            name="private-or-public-radio-check"
            label="Privado"
            helpText="Mantenha o artigo em segredo."
            onChange={setPrivateArticle}
            Icon={privateIcon}
            defaultChecked
          />
          <RadioInput
            id="public-radio"
            name="private-or-public-radio-check"
            label="Público"
            helpText="Publique o artigo globalmente."
            onChange={setPrivateArticle}
            Icon={publicIcon}
          />
        </div>
        <div className="flex justify-center mb-3">
          <CheckBox id="block-replies" text="Bloquear comentários?" />
        </div>
      </div>
      {privateArticle === "private-radio" && (
        <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y border-base-border dark:border-dark-base-border">
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
            podem ser lidos por você. Manter um artigo como privado é muito útil
            quando o artigo ainda não está finalizado, ou caso queiramos remover
            o conteúdo da internet sem a necessidade de deletá-lo para sempre da
            base de dados.
          </span>
        </div>
      )}
      {privateArticle === "public-radio" && (
        <div className="flex justify-center items-center gap-2 w-full my-1 py-2 border-y border-base-border dark:border-dark-base-border">
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
            você estará publicando seu artigo na internet para que todos possam
            lê-lo. Certifique-se de que você tenha uma versão final desse
            artigo.{" "}
            <b>
              Todas as modificações a esse artigo a partir de então exibirão o
              histórico de edições para todos os usuários
            </b>
            .
          </span>
        </div>
      )}
      <div className="mt-4 text-center">
        <ArticleOnSubmitButton />
      </div>
    </form>
  );
};

export default ArticleEditorForm;
