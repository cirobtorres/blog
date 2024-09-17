const ArticleOnSubmitButton = () => {
  return (
    <div className="w-full max-w-5xl">
      <button
        type="submit"
        className="min-w-32 flex justify-center items-center px-2 py-1 rounded-xl font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        <p className="font-extrabold text-base-100 dark:text-base-100">
          Salvar
        </p>
      </button>
    </div>
  );
};

export default ArticleOnSubmitButton;
