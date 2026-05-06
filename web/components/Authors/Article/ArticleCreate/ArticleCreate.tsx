"use client";

import React from "react";
import * as z from "zod";
import { ArticleEditorTitle } from "../../../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../../../Editors/blocks";
import { convertToLargeDate } from "../../../../utils/date";
import { buttonVariants, cn } from "../../../../utils/variants";
import { sonnerToastPromise, sonnerPromise } from "../../../../utils/sonner";
import { useArticleStore } from "../../../../zustand-store/article-state";
import { FieldsetError } from "../../../Fieldset";
import { useAuth } from "../../../../providers/AuthProvider";
import { publishArticleSchema } from "../../../../services/article/zod-validations";
import { ButtonPlaceholder } from "../ArticlePopoverButton";
import { saveArticle } from "../../../../services/article/saveArticle";
import ArticleEditorSlug from "../../../Editors/editors/ArticleEditorSlug";
import ArticleEditorTag from "../../../Editors/editors/ArticleEditorTag";
import ArticleEditorsWrapper from "../ArticleEditorWrapper";
import AlertErrorList from "../AlertErrorList";
import ArticleButton from "../ArticleButton";
import { useRouter } from "next/navigation";
import {
  ArticleBannerButton,
  ArticleMediaManager,
} from "../../../Editors/editors/utils";
import { FileProvider } from "../../../../providers/FileProvider";

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

export function ArticleCreate() {
  const { user } = useAuth();
  const { blocks } = useArticleStore();
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [errors, setErrors] = React.useState<ArticleErrors | null | undefined>(
    null,
  );
  const [, setIsOpenState] = React.useState(false);
  const { replace } = useRouter();

  const [state, action, isPending] = React.useActionState(
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
        replace(`/users/authors/articles/write/${serverResponse.data.id}`);
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success ?? "Artigo salvo!"}</p>
            <p className="text-xs text-neutral-500">{now}</p>
          </div>
        );
      };

      const error = (serverResponse: ActionState) => {
        setIsOpenState(true);
        return <p>{serverResponse.error ?? "Artigo não foi salvo"}</p>;
      };

      const result = saveArticle(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando artigo...");
      return result;
    },
    defaultState,
  );

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const result = publishArticleSchema.safeParse({
      ...rawData,
    });

    if (!result.success) {
      const error = z.treeifyError(result.error).properties;
      setErrors(error);
      event.preventDefault(); // Interrupct Action
      return;
    }

    setErrors(null);
  };

  return (
    <ArticleEditorsWrapper action={action} onSubmit={onSubmit}>
      <FileProvider>
        <ArticleMediaManager />
        <div className="flex justify-between items-center my-6">
          <h1 className="w-full text-3xl font-extrabold">
            Escrever novo artigo
          </h1>
          <div className="w-full flex justify-end items-center gap-2">
            <ArticleButton
              variant="link"
              disabled={isPending}
              className="w-full max-w-30 h-8"
            >
              Salvar
            </ArticleButton>
            <div
              className={cn(
                buttonVariants(),
                "w-full max-w-30 h-8 cursor-auto opacity-50 hover:bg-primary/65",
              )}
            >
              Publicar
            </div>
            <ButtonPlaceholder />
          </div>
        </div>
        <AlertErrorList state={state} />
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex gap-2">
            <div className="w-full">
              <ArticleEditorTitle error={!!errors?.title?.errors} />
              <FieldsetError error={errors?.title?.errors} />
            </div>
            <div className="w-full">
              <ArticleEditorSubtitle error={!!errors?.subtitle?.errors} />
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
              <ArticleEditorSlug error={!!errors?.slug?.errors} />
              <FieldsetError error={errors?.slug?.errors} />
            </div>
          </div>
          {/* <ArticleImage
          trigger={<ArticleBannerButton />}
          multiSelect={false}
          // error={!!errors?.banner?.errors}
        >
          <FolderBreadcrumbState />
          <FolderCardButtons />
          <Hr className="my-6" />
          <FileCardButtons />
        </ArticleImage> */}
          <ArticleBannerButton />
          <FieldsetError error={errors?.banner?.errors} />
        </div>
        <div className="mt-2">
          <BlockList />
        </div>
        <div className="mt-2">
          <AddBlockButton />
        </div>
      </FileProvider>
    </ArticleEditorsWrapper>
  );
}
