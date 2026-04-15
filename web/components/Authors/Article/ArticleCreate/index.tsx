"use client";

import React from "react";
import { ArticleEditorTitle } from "../../../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../../../Editors/blocks";
import { convertToLargeDate } from "../../../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../../../utils/variants";
import {
  publishArticle,
  publishArticleValidation,
} from "../../../../services/article/publishArticle";
import { sonnerToastPromise, sonnerPromise } from "../../../../utils/sonner";
import { Button } from "../../../Button";
import ArticleEditorSlug from "../../../Editors/editors/ArticleEditorSlug";
import ArticleEditorTag from "../../../Editors/editors/ArticleEditorTag";
import ArticleEditorBanner from "../../../Editors/editors/ArticleEditorBanner";
import FolderBreadcrumbState from "../../Media/FolderBreadcrumbState";
import FolderCardButtons from "../../Media/Folders/Cards/FolderCardButtons";
import { Hr } from "../../../utils";
import FileCardButtons from "../../Media/Files/Cards/FileCardButtons";
import { useArticleStore } from "../../../../zustand-store/article-state";
import { FieldsetError } from "../../../Fieldset";
import { useAuth } from "../../../../providers/AuthProvider";
import { slugify } from "../../../../utils/strings-transforms";
import { toast } from "sonner";
import ArticleEditorsWrapper from "./ArticleEditorWrapper";
import AlertErrorList from "./AlertErrorList";
import ArticlePopoverButton from "./ArticlePopoverButton";
import ArticleButton from "./ArticleButton";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export function ArticleCreate() {
  const { user } = useAuth();
  const { blocks } = useArticleStore();
  const [, setIsOpenState] = React.useState(false);
  const router = useRouter();

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const success = (serverResponse: ActionState) => {
        const now = convertToLargeDate(new Date());
        const date = new Date(serverResponse.data.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        const slug = slugify(serverResponse.data.title);
        const articleLink = `/articles/${year}/${month}/${day}/${slug}`;
        return (
          <>
            <div className="flex flex-col">
              <p>Artigo criado com sucesso!</p>
              <p className="text-xs text-neutral-500">{now}</p>
            </div>
            <Button
              type="button"
              onClick={() => {
                toast.dismiss();
                router.push(articleLink);
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

      const validation = await publishArticleValidation(prevState, formData);
      if (!validation.ok) return validation;

      formData.set("body", JSON.stringify(blocks));
      formData.set("userId", user?.data?.id ?? "anonymous");

      const result = publishArticle(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Publicando artigo...");

      return result;
    },
    defaultState,
  );

  const count = React.useRef(0);

  React.useEffect(() => {
    count.current++;
    console.log("ArticleCreate count=", count.current);
  });

  return (
    <ArticleEditorsWrapper>
      <div className="flex justify-between items-center my-6">
        <h1 className="w-full text-3xl font-extrabold">Escrever novo artigo</h1>
        <div className="w-full flex justify-end items-center gap-2">
          <ArticleButton
            variant="link"
            formAction={action}
            disabled={isPending}
            className="w-full max-w-30 h-8"
          >
            Salvar
          </ArticleButton>
          <ArticleButton
            formAction={action}
            disabled={isPending}
            className="w-full max-w-30 h-8"
          >
            Publicar
          </ArticleButton>
          <ArticlePopoverButton />
        </div>
      </div>
      <AlertErrorList state={state} />
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex gap-2">
          <div className="w-full">
            <ArticleEditorTitle error={state?.error?.title} />
            <FieldsetError error={state.error?.title?.errors} />
          </div>
          <div className="w-full">
            <ArticleEditorSubtitle error={state?.error?.subtitle} />
            <FieldsetError error={state.error?.subtitle?.errors} />
          </div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full">
            <ArticleEditorTag />
          </div>
          <div className="w-full">
            <ArticleEditorSlug error={state?.error?.slug} />
            <FieldsetError error={state.error?.slug?.errors} />
          </div>
        </div>
        <ArticleEditorBanner error={state?.error?.banner}>
          <FolderBreadcrumbState />
          <FolderCardButtons />
          <Hr className="my-6" />
          <FileCardButtons />
        </ArticleEditorBanner>
        <FieldsetError error={state.error?.banner?.errors} />
      </div>
      <div className="mt-2">
        <BlockList blocksErrors={state.error?.body?.items} />
      </div>
      <div className="mt-2">
        <AddBlockButton />
      </div>
    </ArticleEditorsWrapper>
  );
}
