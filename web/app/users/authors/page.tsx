"use server";

export default async function AuthorsPage() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Resumo</h1>
      <div className="grid grid-cols-3 gap-2">
        <article className="w-full p-4 border rounded-lg bg-stone-200 dark:bg-stone-900">
          <h2 className="font-bold flex-col">Artigos:</h2>
          <div className="text-sm flex flex-col">
            <span className="text-neutral-600 dark:text-neutral-500">
              Publicados:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
            <span className="text-neutral-600 dark:text-neutral-500">
              Salvos:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
          </div>
          <div className="text-sm flex flex-col">
            <span className="text-neutral-600 dark:text-neutral-500">
              Maior like:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                Link
              </strong>
            </span>
            <span className="text-neutral-600 dark:text-neutral-500">
              Mais comentários:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                Link
              </strong>
            </span>
          </div>
        </article>
        <article className="w-full p-4 border rounded-lg bg-stone-200 dark:bg-stone-900">
          <h2 className="font-bold flex-col">Mídia</h2>
          <div className="text-sm flex flex-col">
            <span className="text-neutral-600 dark:text-neutral-500">
              Pastas:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
            <span className="text-neutral-600 dark:text-neutral-500">
              Arquivos:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
          </div>
        </article>
        <article className="w-full p-4 border rounded-lg bg-stone-200 dark:bg-stone-900">
          <h2 className="font-bold flex-col">Usuários</h2>
          <div className="text-sm flex flex-col">
            <span className="text-neutral-600 dark:text-neutral-500">
              Cadastros:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
            <span className="text-neutral-600 dark:text-neutral-500">
              Comentários:{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                0
              </strong>
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
