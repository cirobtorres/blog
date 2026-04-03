"use server";

export default async function ArticleEditorSlug() {
  return (
    <div className="w-full h-9.5 flex justify-between border rounded bg-stone-200 dark:bg-stone-900">
      <span className="px-2 leading-9 text-sm text-neutral-500">Slug</span>
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
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </div>
  );
}
