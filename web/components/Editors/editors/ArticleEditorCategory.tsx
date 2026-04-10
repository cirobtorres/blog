export default function ArticleEditorCategory() {
  return (
    <div className="flex flex-col">
      <span className="text-neutral-600 dark:text-neutral-500 font-medium mb-2">
        Tags
      </span>
      <div className="w-full h-9.5 flex justify-between border rounded bg-stone-200 dark:bg-stone-900">
        <span className="text-sm leading-9 px-2 text-neutral-700 dark:text-neutral-600">
          Tags
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-neutral-500 h-full mr-2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
