import ArticleEditor from "../../components/ArticleEditor";

export default function CreateArticlePage() {
  return (
    <main className="w-full h-full mx-0">
      <form className="w-full max-w-webpage mx-auto mt-8 flex flex-col items-center gap-2">
        <ArticleEditorLabel
          id="article-title"
          text="Título"
          placeholder="Título do artigo"
        />
        <ArticleEditorLabel
          id="article-subtitle"
          text="Subtítulo"
          placeholder="Texto do subheading do artigo"
        />
        <ArticleEditor />
        <ArticleSave />
      </form>
    </main>
  );
}

const ArticleSave = () => {
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

const ArticleEditorLabel = ({
  id,
  text,
  placeholder = "",
}: {
  id: string;
  text: string;
  placeholder?: string;
}) => {
  return (
    <div
      className={`
      relative w-full h-full max-w-5xl flex flex-col justify-start items-start overflow-hidden 
      text-xl text-base-neutral dark:text-dark-base-neutral 
      bg-base-100 dark:bg-dark-base-300 
      rounded-xl border border-base-200 dark:border-dark-base-border outline-none 
    `}
    >
      <label
        htmlFor={id}
        className="bg-base-200 dark:bg-dark-base-300 border-b border-base-200 dark:border-dark-base-border w-full cursor-pointer font-extrabold text-xl px-8 py-2"
      >
        {text}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="w-full h-full px-8 py-2 text-xl outline-none border-none bg-transparent placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder dark:bg-dark-base-200 hover:dark:bg-dark-base-150 focus:dark:bg-dark-base-150"
      />
    </div>
  );
};
