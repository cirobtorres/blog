const ArticleOnSubmitButton = () => {
  return (
    <div className="w-full max-w-5xl">
      <button
        type="submit"
        className={`
        w-40 h-8 ml-auto mr-0
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-green hover:bg-base-green-hover 
        dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover 
      `}
      >
        <p className="font-extrabold text-base-100 dark:text-base-100">
          Salvar
        </p>
      </button>
    </div>
  );
};

export default ArticleOnSubmitButton;
