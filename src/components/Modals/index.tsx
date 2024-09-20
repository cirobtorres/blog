"use client";

import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const SubmitConfirmationModal = ({
  isOpen,
  setIsOpen,
  submitForm,
  title,
  radioVal,
  checkVal,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  submitForm: () => void;
  title: string;
  radioVal: "private" | "public";
  checkVal: "blocked" | "unblocked";
}) => {
  const handleClickOutside = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      document.body.classList.remove("modal-shown");
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <dialog
        onClick={handleClickOutside}
        className="flex items-center justify-center z-50 fixed inset-0 size-full backdrop-blur-sm bg-black/25"
      >
        <div className="min-w-[300px] max-w-[450px] rounded-xl overflow-hidden bg-base-100 dark:bg-dark-base-100">
          <div className="flex justify-between gap-1 items-center p-4 bg-base-200 dark:bg-dark-base-300">
            <h1 className="truncate font-extrabold text-base-green dark:text-dark-base-green">
              {title}
            </h1>
            <button
              type="button"
              className="text-base-neutral dark:text-dark-base-neutral rounded-full p-2 transition-all hover:rotate-90 hover:bg-base-100 dark:hover:bg-dark-base-150"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                setIsOpen(false);
              }}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          {radioVal === "private" && (
            <div className="border-y-[1px] border-base-border dark:border-dark-base-placeholder flex gap-2 items-center p-2 px-8 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-base-yellow flex-shrink-0"
              >
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              <p className="text-xs text-base-yellow dark:text-dark-base-yellow">
                Seu artigo está marcado como{" "}
                <span className="font-extrabold">privado</span>. Artigos
                privados só podem ser lidos por você. Manter um artigo como
                privado é muito útil quando o artigo ainda não está finalizado,
                ou caso queiramos remover o conteúdo da internet sem a
                necessidade de deletá-lo para sempre da base de dados.
              </p>
            </div>
          )}
          {radioVal === "public" && (
            <div className="border-y-[1px] border-base-border dark:border-dark-base-placeholder flex gap-2 items-center p-2 px-8 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-base-blue flex-shrink-0"
              >
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
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
            </div>
          )}
          {checkVal === "blocked" && (
            <div className="border-y-[1px] border-base-border dark:border-dark-base-placeholder flex gap-2 items-center p-2 px-8 my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="fill-base-red flex-shrink-0"
              >
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>
              <p className="text-xs text-base-red dark:text-dark-base-red">
                Comentários <span className="font-extrabold">BLOQUEADOS</span>
              </p>
            </div>
          )}
          <div className="flex items-center justify-between mb-8 px-8">
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                setIsOpen(false);
              }}
              className="w-full h-full flex justify-center items-center px-2 py-1 font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover dark:hover:text-dark-base-neutral-hover"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                submitForm();
                setIsOpen(false);
              }}
              className="w-full h-full ml-auto mr-0 flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    )
  );
};

const DeleteConfirmationModal = ({
  isOpen,
  setIsOpen,
  submitForm,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  submitForm: () => void;
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDialogElement>) => {
    event.preventDefault();
    if (ref.current && !ref.current.contains(event.target as Node)) {
      document.body.classList.remove("modal-shown");
      setError(false);
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <dialog
        onClick={handleClickOutside}
        className="flex items-center justify-center z-50 fixed inset-0 size-full backdrop-blur-sm bg-black/25"
      >
        <div
          ref={ref}
          className="min-w-[300px] max-w-[450px] rounded-xl overflow-hidden bg-base-100 dark:bg-dark-base-100"
        >
          <div className="flex justify-between gap-1 items-center py-4 px-8 border-b dark:border-dark-base-placeholder bg-base-200 dark:bg-dark-base-300">
            <h1 className="truncate font-extrabold text-base-green dark:text-dark-base-green">
              Deseja DELETAR esse artigo?
            </h1>
            <button
              type="button"
              className="text-base-neutral dark:text-dark-base-neutral rounded-full p-2 transition-all hover:rotate-90 hover:bg-base-100 dark:hover:bg-dark-base-150"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                setError(false);
                setIsOpen(false);
              }}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <div className="border-y-[1px] border-base-border dark:border-dark-base-placeholder flex gap-2 items-center p-2 px-8 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-base-yellow flex-shrink-0"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <p className="text-xs text-base-yellow dark:text-dark-base-yellow">
              <span className="font-extrabold">
                Essa ação não tem mais volta!
              </span>{" "}
              No atual momento do blog, uma função de soft delete ainda não foi
              implementada.{" "}
              <span className="font-extrabold">
                Confirmar o delete implicará em permanente exclusão desse artigo
                da base de dados
              </span>
              , portanto esteja certo dessa decisão antes de prosseguir!
            </p>
          </div>
          <div className="px-8 mb-4">
            <label
              htmlFor="confirm-article-delete-input"
              className="text-sm text-base-neutral dark:text-dark-base-neutral"
            >
              Escreva <strong className="font-extrabold">DELETAR</strong> no
              campo abaixo e confirme:
            </label>
            <input
              id="confirm-article-delete-input"
              name="confirm-article-delete-input"
              type="text"
              autoFocus
              placeholder="DELETAR"
              value={deleteConfirmation}
              onChange={(event) =>
                setDeleteConfirmation(event.currentTarget.value)
              }
              className={`w-full px-2 py-1 mt-1 outline-none text-base-neutral dark:text-dark-base-neutral placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder rounded border ${
                error
                  ? "border-base-red dark:border-dark-base-red"
                  : "border-base-neutral dark:border-dark-base-placeholder"
              } bg-base-100 dark:bg-dark-base-150 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-500 focus:dark:outline-blue-500`}
            />
            {error && (
              <p className="mt-1 text-xs text-base-red dark:text-dark-base-red">
                Confirme a palavra escrevendo DELETAR no campo acima!
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mb-8 px-8">
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                setError(false);
                setIsOpen(false);
              }}
              className="w-full h-full flex justify-center items-center px-2 py-1 font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover dark:hover:text-dark-base-neutral-hover"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                if (deleteConfirmation === "DELETAR") {
                  submitForm();
                  setError(false);
                  setIsOpen(false);
                } else {
                  setError(true);
                }
              }}
              className="w-full h-full ml-auto mr-0 flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-red-500 dark:border-red-100 bg-base-red hover:bg-[#ff8181] dark:bg-dark-base-red dark:hover:bg-[#fd7d7d]"
            >
              Confirmar
            </button>
          </div>
        </div>
      </dialog>
    )
  );
};

export { SubmitConfirmationModal, DeleteConfirmationModal };
