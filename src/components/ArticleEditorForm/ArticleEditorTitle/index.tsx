interface ErrorState {
  titleEmptyError: boolean;
}

const ArticleEditorTitle = ({
  id,
  text,
  onChange,
  value,
  errors = null,
  placeholder = "",
}: {
  id: string;
  text: string;
  value: string;
  onChange: (value: string) => void;
  errors?: ErrorState | null;
  placeholder?: string;
}) => {
  return (
    <div
      id={`${id}-top`}
      className={`
      w-full flex flex-col justify-start items-start overflow-hidden 
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
        rows={2}
        maxLength={115}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoFocus
        placeholder={placeholder}
        className={`resize-none overflow-hidden w-full h-full border ${
          errors?.titleEmptyError
            ? "border-base-red dark:border-dark-base-red"
            : "border-base-border dark:border-dark-base-border focus:outline-blue-500"
        } rounded p-2 transition-[outline] duration-200 outline-none outline-2 outline-transparent -outline-offset-2 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder 
      `}
      />
      {errors?.titleEmptyError && (
        <p className="mt-2 ml-2 text-xs text-base-red dark:text-dark-base-red">
          O campo <span className="font-extrabold">Título</span> é obrigatório!
        </p>
      )}
    </div>
  );
};

export default ArticleEditorTitle;
