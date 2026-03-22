"use client";

import React from "react";
import { ArticleEditorTitle } from "../ArticleEditors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../ArticleEditors/editors/ArticleEditorSubtitle";
import { ArticleEditorBanner } from "../ArticleEditors/editors/ArticleEditorBanner";
import { AddBlockButton, BlockList } from "../ArticleEditors/blocks";
import { convertToLargeDate } from "../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../utils/variants";
import {
  publishArticle,
  publishArticleValidation,
} from "../../services/article/publishArticle";
import { Alert } from "../Alert";
import { FieldsetError } from "../Fieldset";
import { sonnerToastPromise } from "../../utils/sooner";
import Spinner from "../Spinner";
import { Button } from "../Button";

export function ArticleCreate() {
  const [blocks, setBlocks] = React.useState<Blocks[]>([]);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [isOpenState, setIsOpenState] = React.useState(false);
  const router = useRouter();

  const [publishState, onPublishAction, isPublishPending] =
    React.useActionState(
      async (prevState: ActionState) => {
        const formData = new FormData();

        formData.set("title", title);
        formData.set("subtitle", subtitle);
        formData.set("body", JSON.stringify(blocks));

        const success = (serverResponse: ActionState) => {
          const now = convertToLargeDate(
            new Date(serverResponse.data?.updated_at ?? new Date()),
          );

          const articleLink = serverResponse.data?.link;

          return (
            <>
              <div className="flex flex-col">
                <p>{serverResponse.success}</p>
                <p className="text-xs text-neutral-500">{now}</p>
              </div>
              {articleLink && (
                <button
                  type="button"
                  onClick={() => router.push(articleLink)}
                  className={cn(
                    "cursor-pointer text-xs font-semibold px-3 py-2 rounded text-neutral-100 border border-primary bg-secondary",
                    focusRing,
                  )}
                >
                  Artigo
                </button>
              )}
            </>
          );
        };

        const error = () => {
          setIsOpenState(true);
          return <p>Artigo não publicado</p>;
        };

        const validation = await publishArticleValidation(prevState, formData);

        if (!validation.ok) return validation;

        const validatedFormData = new FormData();
        const {
          title: validatedTitle,
          subtitle: validatedSubtitle,
          body: validatedBody,
        } = validation.data;

        validatedFormData.set("title", validatedTitle);
        validatedFormData.set("subtitle", validatedSubtitle);
        validatedFormData.set("body", JSON.stringify(validatedBody));

        const result = publishArticle(prevState, validatedFormData);

        const promise: Promise<ActionState> = new Promise((resolve, reject) => {
          result.then((data) => {
            if (data.ok) resolve(result);
            else reject(result);
          });
        });

        sonnerToastPromise(promise, success, error, "Publicando artigo...");

        return result;
      },
      {
        ok: false,
        success: null,
        error: null,
        data: null,
      },
    );

  const [saveState, saveAction, isSavePending] = React.useActionState(
    async () => {},
    null,
  );

  return (
    <form className="w-full max-w-4xl mx-auto flex-1 flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Escrever novo artigo</h1>
      {publishState.error ? (
        <Alert title="Erros" variant="default">
          {publishState.error.title &&
            publishState.error.title.errors.map(
              (err: string[], index: number) => (
                <p key={"title-" + index} className="text-destructive!">
                  {err}
                </p>
              ),
            )}
          {publishState.error.subtitle &&
            publishState.error.subtitle.errors.map(
              (err: string[], index: number) => (
                <p key={"subtitle-" + index} className="text-destructive!">
                  {err}
                </p>
              ),
            )}
          {publishState.error.body &&
            publishState.error.body.errors.map(
              (err: string[], index: number) => (
                <p key={"body-" + index} className="text-destructive!">
                  {err}
                </p>
              ),
            )}
          {publishState.error.body?.items &&
            publishState.error.body.items.map(
              ({
                properties: {
                  data: {
                    properties: { body: obj },
                  },
                },
              }: {
                properties: {
                  data: { properties: { body: { errors: string[] } } };
                };
              }) => {
                return obj.errors.map((err: string, idx: number) => (
                  <p key={"body-err-" + idx} className="text-destructive!">
                    {err}
                  </p>
                ));
              },
            )}
        </Alert>
      ) : null}
      <ArticleEditorTitle
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={publishState.error?.title?.errors}
      />
      <FieldsetError error={publishState.error?.title?.errors} />
      <ArticleEditorSubtitle
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        error={publishState.error?.subtitle?.errors}
      />
      <FieldsetError error={publishState.error?.subtitle?.errors} />
      <ArticleEditorBanner />
      <BlockList
        blocks={blocks}
        setBlocks={setBlocks}
        blocksErrors={publishState.error?.body?.items}
      />
      <AddBlockButton blocks={blocks} setBlocks={setBlocks} />
      <div className="w-full flex flex-col border rounded bg-stone-900 overflow-hidden">
        <div className="flex justify-between items-center border-b p-2 gap-10">
          <div className="flex flex-col">
            <p className="text-sm">Publicar artigo</p>
            <p className="text-xs text-neutral-400">
              Artigos publicados são visíveis a todos os visitantes do site.
            </p>
          </div>
          <Button
            type="submit"
            formAction={onPublishAction}
            className="w-full h-8 max-w-40"
          >
            {isPublishPending && <Spinner />} Publicar
          </Button>
        </div>
        <div className="flex justify-between items-center border-b p-2 gap-10">
          <div className="flex flex-col">
            <p className="text-sm">Salvar artigo</p>
            <p className="text-xs text-neutral-400">
              Artigos salvos não são visíveis aos visitantes do site, ou, se
              tratarem-se de artigos já publicados, as mudanças salvas não serão
              visíveis até a publicação.
            </p>
          </div>
          <Button
            type="submit"
            formAction={onPublishAction}
            variant="outline"
            className="w-full h-8 max-w-40 text-neutral-100 dark:text-neutral-100 bg-emerald-500/75 border-emerald-500 dark:bg-emerald-500/75 dark:border-emerald-500"
          >
            {isSavePending && <Spinner />} Salvar
          </Button>
        </div>
        <div className="flex justify-between items-center border-b p-2 gap-10">
          <div className="flex flex-col">
            <p className="text-sm">Despublicar artigo</p>
            <p className="text-xs text-neutral-400">
              Artigos despublicados são removidos da visibilidade dos usuários
              do site.
            </p>
          </div>
          <Button variant="outline" className="w-full h-8 max-w-40">
            Despublicar
          </Button>
        </div>
        <div className="flex justify-between items-center p-2 gap-10 bg-linear-to-r from-destructive/25 to-destructive/5">
          <div className="flex flex-col">
            <p className="text-sm">Excluir artigo</p>
            <p className="text-xs text-neutral-300">
              Artigos excluídos não podem ser recuperados.
            </p>
          </div>
          <Button variant="destructive" className="w-full h-8 max-w-40">
            Excluir
          </Button>
        </div>
      </div>
    </form>
  );
}
