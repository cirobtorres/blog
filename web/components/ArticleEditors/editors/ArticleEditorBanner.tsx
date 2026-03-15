export function ArticleEditorBanner({ id }: { id: string }) {
  const bannerInputId = "banner-input-" + id;
  const bannerLabelId = "banner-label-" + id;
  return (
    <fieldset className="relative w-full flex justify-center items-center aspect-[calc(21/9)] border rounded overflow-hidden bg-container not-dark:shadow">
      <label
        id={bannerLabelId}
        htmlFor={bannerInputId}
        className="size-1/2 flex flex-col justify-center items-center rounded-xl border border-dashed text-sm text-neutral-400 dark:text-neutral-500"
      >
        <input
          id={bannerInputId}
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
