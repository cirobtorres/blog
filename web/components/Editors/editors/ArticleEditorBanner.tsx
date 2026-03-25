export function ArticleEditorBanner() {
  return (
    <fieldset className="relative w-full flex justify-center items-center aspect-[calc(21/9)] border rounded overflow-hidden bg-stone-200 dark:bg-stone-900 not-dark:shadow">
      <label
        id="article-banner"
        htmlFor="article-banner"
        className="size-1/2 flex flex-col justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500"
      >
        <input
          id="article-banner"
          name="articleBanner"
          type="file"
          accept="image/*"
          hidden
          className="hidden"
        />
        Clique aqui ou arraste e solte a imagem
      </label>
    </fieldset>
  );
}
