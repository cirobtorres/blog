import Loading from "@/components/Loading";

const ArticleOnSubmitButton = ({
  modalConfirmation,
  loading,
}: {
  modalConfirmation: (value: boolean) => void;
  loading: boolean;
}) => {
  return (
    <div className="h-8 w-full max-w-5xl">
      <button
        type="button"
        disabled={loading}
        onClick={(event) => {
          event.preventDefault();
          document.body.classList.add("modal-shown");
          modalConfirmation(true);
        }}
        className="h-full min-w-32 flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        {loading ? (
          <Loading size={24} />
        ) : (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Salvar
          </p>
        )}
      </button>
    </div>
  );
};

const ArticleDeleteButton = ({
  modalConfirmation,
  loading,
}: {
  modalConfirmation: (value: boolean) => void;
  loading: boolean;
}) => {
  return (
    <div className="h-8 w-full max-w-5xl">
      <button
        type="button"
        disabled={loading}
        onClick={(event) => {
          event.preventDefault();
          document.body.classList.add("modal-shown");
          modalConfirmation(true);
        }}
        className="h-full min-w-32 flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-red-500 dark:border-red-100 bg-base-red hover:bg-[#ff8181] dark:bg-dark-base-red dark:hover:bg-[#fd7d7d]"
      >
        {loading ? (
          <Loading size={24} />
        ) : (
          <p className="font-extrabold text-red-100 dark:text-red-100">
            Deletar
          </p>
        )}
      </button>
    </div>
  );
};

export { ArticleOnSubmitButton, ArticleDeleteButton };
