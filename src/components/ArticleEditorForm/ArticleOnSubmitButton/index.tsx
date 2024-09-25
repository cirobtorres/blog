import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ReturnButton = () => {
  return (
    <Link
      href="/painel"
      className="w-28 h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-neutral dark:text-dark-base-neutral border border-[#cacaca] dark:border-[#494949] bg-base-200 dark:bg-[#2c2c2c] hover:bg-[#e6e6e6] dark:hover:bg-[#292929] group" // w-full
    >
      <span className="relative transition-all duration-200 group-hover:translate-x-1">
        <MdKeyboardArrowLeft className="absolute top-1/2 -translate-y-1/2 -left-3 text-xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1.5" />
        Voltar
      </span>
    </Link>
  );
};

const ArticleOnSubmitButton = ({
  modalConfirmation,
}: {
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
          Salvar
        </p>
      </button>
    </div>
  );
};

const ArticleDeleteButton = ({
  modalConfirmation,
}: {
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
        className="w-full h-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-red-500 dark:border-red-100 bg-base-red hover:bg-[#ff8181] dark:bg-dark-base-red dark:hover:bg-[#fd7d7d]"
      >
        <p className="font-extrabold text-red-100 dark:text-red-100">Deletar</p>
      </button>
    </div>
  );
};

export { ReturnButton, ArticleOnSubmitButton, ArticleDeleteButton };
