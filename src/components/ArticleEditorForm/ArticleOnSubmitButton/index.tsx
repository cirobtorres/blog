"use client";

import Loading from "@/components/Loading";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ReturnButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="w-28 h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral border border-[#cacaca] dark:border-[#494949] bg-base-200 dark:bg-[#2c2c2c] hover:bg-[#e6e6e6] dark:hover:bg-[#292929] group" // w-full
    >
      <span className="relative transition-all duration-200 group-hover:translate-x-1">
        <MdKeyboardArrowLeft className="absolute top-1/2 -translate-y-1/2 -left-3 text-xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1.5" />
        Voltar
      </span>
    </Link>
  );
};

const SummaryCreateButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="h-8 w-28">
      <button
        type="submit"
        disabled={pending}
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        {!pending && (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Criar
          </p>
        )}
        {pending && <Loading size={24} />}
      </button>
    </div>
  );
};

const SummaryUpdateButton = ({ loading }: { loading: boolean }) => {
  return (
    <div className="h-8 w-28">
      <button
        type="submit"
        disabled={loading}
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        {!loading && (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Salvar
          </p>
        )}
        {loading && <Loading size={24} />}
      </button>
    </div>
  );
};

const ArticleOnSubmitButton = ({
  text,
  modalConfirmation,
}: {
  text: string;
  modalConfirmation: (value: boolean) => void;
}) => {
  return (
    <div
      className="h-8 w-28" // w-full max-w-[100px]
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          document.body.classList.add("modal-shown");
          modalConfirmation(true);
        }}
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        <p className="font-extrabold text-base-100 dark:text-base-100">
          {text}
        </p>
      </button>
    </div>
  );
};

const ArticleCreateButton = ({ loading }: { loading: boolean }) => {
  return (
    <div className="h-8 w-28">
      <button
        type="submit"
        disabled={loading}
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#35729b] dark:border-[#b0e4f8] bg-base-blue hover:bg-base-blue-hover dark:bg-dark-base-blue dark:hover:bg-dark-base-blue-hover"
      >
        {loading && <Loading size={24} />}
        {!loading && (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Publicar
          </p>
        )}
      </button>
    </div>
  );
};

const ArticleUpdateButton = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className="h-8 w-28" // w-full max-w-[100px]
    >
      <button
        type="submit"
        disabled={loading}
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        {loading && <Loading size={24} />}
        {!loading && (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Atualizar
          </p>
        )}
      </button>
    </div>
  );
};

const EditBodyButton = ({ path }: { path: string }) => {
  return (
    <Link
      href={path}
      className="h-8 w-28" // w-full max-w-[100px]
    >
      <button
        type="submit"
        className="max-w-36 h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        <p className="font-extrabold text-base-100 dark:text-base-100">
          Editar artigo
        </p>
      </button>
    </Link>
  );
};

const ArticleDeleteButton = () => {
  return (
    <div
      className="h-8 w-28" // w-full max-w-[100px]
    >
      <button
        type="button"
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-red-500 dark:border-red-100 bg-base-red hover:bg-[#ff8181] dark:bg-dark-base-red dark:hover:bg-[#fd7d7d]"
      >
        <p className="font-extrabold text-red-100 dark:text-red-100">Deletar</p>
      </button>
    </div>
  );
};

export {
  ReturnButton,
  SummaryCreateButton,
  SummaryUpdateButton,
  ArticleCreateButton,
  ArticleOnSubmitButton,
  ArticleUpdateButton,
  ArticleDeleteButton,
  EditBodyButton,
};
