"use client";

import ArticleOnSubmitButton from "./ArticleOnSubmitButton";
import ArticleEditor from "./ArticleEditor";
import { useState } from "react";
import { submitArticle } from "../../lib/article";
import { User } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";

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
      text-xl text-base-neutral dark:text-dark-base-neutral bg-base-100 dark:bg-dark-base-200
      outline-none border border-base-200 dark:border-dark-base-border 
    `}
    >
      <label
        htmlFor={id}
        className="w-full bg-base-200 dark:bg-dark-base-300 border-b border-base-200 dark:border-dark-base-border cursor-pointer font-extrabold text-xl p-2"
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
        className="w-full h-full p-2 text-xl outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
      />
    </div>
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
      className="w-full max-w-5xl mx-auto my-4 flex flex-col items-center"
    >
      <div className="w-full flex flex-col items-center gap-3">
        <ArticleEditorLabel
          id="article-title"
          text="Título"
          value={title}
          onChange={setTitle}
          placeholder="Título do artigo"
        />
        <ArticleEditorLabel
          id="article-subtitle"
          text="Subtítulo"
          value={subtitle}
          onChange={setSubtitle}
          placeholder="Texto do subheading do artigo"
        />
        {/* <ArticleEditor onChange={setBody} /> */}
      </div>
      <ArticleOnSubmitButton />
    </form>
  );
};

export default ArticleEditorForm;
