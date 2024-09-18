const ArticleEditorTitle = ({
  id,
  text,
  onChange,
  value,
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
        rows={2}
        maxLength={115}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="resize-none overflow-hidden w-full h-full border-2 border-base-200 dark:border-dark-base-border rounded-xl p-2 outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
      />
    </div>
  );
};

export default ArticleEditorTitle;
