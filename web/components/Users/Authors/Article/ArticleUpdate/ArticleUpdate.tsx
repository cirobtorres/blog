"use client";

import React from "react";
import * as z from "zod";
import { ArticleEditorTitle } from "../../../../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../../../../Editors/blocks";
import { convertToLargeDate, mountURL } from "../../../../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../../../../utils/variants";
import { publishArticle } from "../../../../../services/article/publishArticle";
import { sonnerToastPromise, sonnerPromise } from "../../../../../utils/sonner";
import { Button } from "../../../../Button";
import { useArticleStore } from "../../../../../zustand-store/article-state";
import { FieldsetError } from "../../../../Fieldset";
import { useAuth } from "../../../../../providers/AuthProvider";
import { toast } from "sonner";
import { publishArticleSchema } from "../../../../../services/article/zod-validations";
import { ArticlePopoverButton } from "../ArticlePopoverButton";
import ArticleEditorSlug from "../../../../Editors/editors/ArticleEditorSlug";
import ArticleEditorTag from "../../../../Editors/editors/ArticleEditorTag";
import ArticleButton from "../ArticleButton";
import AlertErrorList from "../AlertErrorList";
import putSaveArticle from "../../../../../services/article/putSaveArticle";
import {
  ArticleBannerButton,
  ArticleMediaManager,
} from "../../../../Editors/editors/ArticleEditorImage";
import { FileProvider } from "../../../../../providers/FileProvider";

interface ArticleErrors {
  title?: { errors?: string[] };
  subtitle?: { errors?: string[] };
  slug?: { errors?: string[] };
  banner?: { errors?: string[] };
  tags?: { errors?: string[] };
}

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export function ArticleUpdate({
  id,
  title,
  subtitle,
  tags,
  slug,
  media,
  body,
  status,
}: Article) {
  const { user } = useAuth();
  const { blocks } = useArticleStore();
  const [errors, setErrors] = React.useState<ArticleErrors | null | undefined>(
    null,
  );
  const [, setIsOpenState] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(() => tags);
  const router = useRouter();

  const [saveState, saveAction, isSavePending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (!user?.data?.id) {
        return {
          ...defaultState,
          error: ["Você precisa estar logado"],
        };
      }

      formData.set("userId", user.data.id);
      formData.set("body", JSON.stringify(blocks));

      const publishSuccess = (serverResponse: ActionState) => {
        const now = convertToLargeDate(new Date());
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success ?? "Artigo salvo!"}</p>
            <p className="text-xs text-neutral-500">{now}</p>
          </div>
        );
      };

      const saveError = (serverResponse: ActionState) => {
        setIsOpenState(true);
        return <p>{serverResponse.error ?? "Artigo não foi salvo"}</p>;
      };

      const saveResult = putSaveArticle(prevState, formData);
      const savePromise = sonnerPromise(saveResult);
      sonnerToastPromise(
        savePromise,
        publishSuccess,
        saveError,
        "Salvando artigo...",
      );
      return saveResult;
    },
    defaultState,
  );

  const [publishState, publishAction, isPublishPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (!user?.data?.id) {
        return {
          ...defaultState,
          error: ["Você precisa estar logado"],
        };
      }

      formData.set("userId", user.data.id);
      formData.set("body", JSON.stringify(blocks));

      const success = (serverResponse: ActionState) => {
        const now = convertToLargeDate(new Date());
        return (
          <>
            <div className="flex flex-col">
              <p>{serverResponse.success || "Artigo publicado!"}</p>
              <p className="text-xs text-neutral-500">{now}</p>
            </div>
            <Button
              type="button"
              onClick={() => {
                toast.dismiss();
                router.push(mountURL(serverResponse.data));
              }}
              variant="default"
              className={cn("h-6 text-xs", focusRing)}
            >
              Artigo
            </Button>
          </>
        );
      };

      const error = (serverResponse: ActionState) => {
        setIsOpenState(true);
        return <p>{serverResponse.error ?? "Artigo não publicado"}</p>;
      };

      const result = publishArticle(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Publicando artigo...");
      return result;
    },
    defaultState,
  );

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    // event.stopPropagation();

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const result = publishArticleSchema.safeParse({
      ...rawData,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error).properties;
      setErrors(error);
      return;
    }

    setErrors(null);

    // "intent" = which button was clicked
    // @ts-expect-error - submitter do exist in nativeEvent
    const intent = event.nativeEvent.submitter?.value;
    React.startTransition(() => {
      if (intent === "publish") {
        publishAction(formData);
      } else {
        saveAction(formData);
      }
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto my-6 px-2 flex-1 flex flex-col">
      <form onSubmit={onSubmit}>
        <FileProvider>
          <ArticleMediaManager />
          <div className="flex justify-between items-center mb-6">
            <h1 className="w-full text-3xl font-extrabold">
              Escrever novo artigo
            </h1>
            <div className="w-full flex justify-end items-center gap-2">
              <ArticleButton
                type="submit"
                name="intent"
                value="save"
                variant="link"
                disabled={isPublishPending || isSavePending}
                className="w-full max-w-30 h-8"
              >
                Salvar
              </ArticleButton>
              <ArticleButton
                type="submit"
                name="intent"
                value="publish"
                disabled={isPublishPending || isSavePending}
                className="w-full max-w-30 h-8"
              >
                Publicar
              </ArticleButton>
              <ArticlePopoverButton articleId={id} status={status} />
            </div>
          </div>
          <AlertErrorList state={saveState || publishState} />
          <div className="w-full flex flex-col gap-2">
            <input
              hidden
              type="hidden"
              className="appearance-none"
              name="id"
              value={id}
            />
            <input
              hidden
              type="hidden"
              className="appearance-none"
              name="status"
              value={status}
            />
            <div className="w-full flex gap-2">
              <div className="w-full">
                <ArticleEditorTitle
                  defaultVal={title}
                  error={!!errors?.title?.errors}
                />
                <FieldsetError error={errors?.title?.errors} />
              </div>
              <div className="w-full">
                <ArticleEditorSubtitle
                  defaultVal={subtitle}
                  error={!!errors?.subtitle?.errors}
                />
                <FieldsetError error={errors?.subtitle?.errors} />
              </div>
            </div>
            <div className="w-full flex gap-2">
              <div className="w-full">
                <ArticleEditorTag
                  tags={selectedTags}
                  setTags={setSelectedTags}
                  error={!!errors?.tags?.errors}
                />
                <FieldsetError error={errors?.tags?.errors} />
              </div>
              <div className="w-full">
                <ArticleEditorSlug
                  defaultVal={slug}
                  error={!!errors?.slug?.errors}
                />
                <FieldsetError error={errors?.slug?.errors} />
              </div>
            </div>
            <ArticleBannerButton defaultBanner={media} />
            <FieldsetError error={errors?.banner?.errors} />
          </div>
          <div className="mt-2">
            <BlockList defaultVal={body} />
          </div>
          <div className="mt-2">
            <AddBlockButton />
          </div>
        </FileProvider>
      </form>
    </section>
  );
}
