"use client";

import React from "react";
import { PublishButton } from "./buttons/PublishButton";
import { SaveButton } from "./buttons/SaveButton";
import { OptionsButton } from "./buttons/OptionsButton";
import { ArticleEditorTitle } from "../ArticleEditors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../ArticleEditors/editors/ArticleEditorSubtitle";
import { ArticleEditorBanner } from "../ArticleEditors/editors/ArticleEditorBanner";
import { AddBlockButton, BlockList } from "../ArticleEditors/blocks";
import { convertToLargeDate } from "../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../utils/variants";
import { publishArticle } from "../../services/article/publishArticle";
import { sonnerToastPromise } from "../Sooner";

const profileId = "321";

export function ArticleCreate() {
  const [blocks, setBlocks] = React.useState<Blocks[]>([]);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [isOpenState, setIsOpenState] = React.useState(false);
  const router = useRouter();

  const [publishState, onPublishAction, isPublishPending] =
    React.useActionState(
      async (prevState: ArticleState) => {
        const formData = new FormData();

        formData.set("profileId", profileId);
        formData.set("articleTitle", title);
        formData.set("articleSubtitle", subtitle);
        formData.set("articleBody", JSON.stringify(blocks));

        const success = (serverResponse: ArticleState) => {
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

        const result = publishArticle(prevState, formData);

        const promise: Promise<ArticleState> = new Promise(
          (resolve, reject) => {
            result.then((data) => {
              if (data.ok) resolve(result);
              else reject(result);
            });
          },
        );

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
    <form className="relative w-full grid grid-cols-[minmax(0,var(--container-4xl))_1fr]">
      <div className="w-full max-w-4xl mx-auto p-2 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold my-6">Escrever novo artigo</h1>
        <ArticleEditorTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ArticleEditorSubtitle
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <ArticleEditorBanner />
        <BlockList blocks={blocks} setBlocks={setBlocks} />
        <AddBlockButton blocks={blocks} setBlocks={setBlocks} />
      </div>
      <div className="w-full sticky top-0 grid grid-cols-[max-content_1fr] py-2 px-0 mr-auto ml-0 gap-2 mt-23 mb-auto">
        <PublishButton
          label="Publicar"
          disabled={isPublishPending}
          action={onPublishAction}
          className="max-w-xs min-w-60"
        />
        <OptionsButton />
        <div className="flex flex-col gap-2">
          <SaveButton
            label="Salvar"
            action={onPublishAction}
            className="max-w-xs min-w-60"
          />
        </div>
      </div>
    </form>
  );
}
