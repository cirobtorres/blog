"use client";

import React from "react";
import { ArticleEditorTitle } from "../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../Editors/blocks";
import { convertToLargeDate } from "../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../utils/variants";
import {
  publishArticle,
  publishArticleValidation,
} from "../../services/article/publishArticle";
import { Alert } from "../Alert";
import { sonnerToastPromise, soonerPromise } from "../../utils/sooner";
import Spinner from "../Spinner";
import { Button } from "../Button";
import ArticleEditorSlug from "../Editors/editors/ArticleEditorSlug";
import ArticleEditorCategory from "../Editors/editors/ArticleEditorCategory";
import ArticleEditorBanner from "../Editors/editors/ArticleEditorBanner";
import FolderBreadcrumbState from "../Authors/Media/FolderBreadcrumbState";
import FolderCardButtons from "../Authors/Media/Folders/Cards/FolderCardButtons";
import { Hr } from "../utils";
import FileCardButtons from "../Authors/Media/Files/Cards/FileCardButtons";
import { useArticleStore } from "../../zustand-store/article-state";
import { FieldsetError } from "../Fieldset";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { useAuth } from "../../providers/AuthProvider";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export function ArticleCreate() {
  const { user } = useAuth();
  const { blocks, setBlocks, title, subtitle } = useArticleStore();
  const [isOpenState, setIsOpenState] = React.useState(false);
  const router = useRouter();

  const [saveState, saveAction, isSavePending] = React.useActionState(
    async () => {
      const success = (serverResponse: ActionState) => {
        return (
          <div className="flex flex-col">
            <p>{serverResponse.success}</p>
          </div>
        );
      };

      const error = () => {
        setIsOpenState(true);
        return <p>Artigo não publicado</p>;
      };

      const result = new Promise((resolve) =>
        setTimeout(resolve, 2000, {
          ...defaultState,
          ok: true,
          success: "Artigo salvo",
        }),
      );

      const promise = soonerPromise(result as Promise<ActionState>);
      sonnerToastPromise(promise, success, error, "Publicando artigo...");

      return result;
    },
    defaultState,
  );

  const [publishState, publishAction, isPublishPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
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

      const error = (serverResponse: ActionState) => {
        setIsOpenState(true);
        return <p>{serverResponse.error ?? "Artigo não publicado"}</p>;
      };

      const validation = await publishArticleValidation(prevState, formData);

      if (!validation.ok) return validation;

      const validatedFormData = new FormData();
      const {
        title: validatedTitle,
        subtitle: validatedSubtitle,
        slug: validatedSlug,
        banner: validatedBannerMediaId,
        body: validatedBody,
      } = validation.data;

      validatedFormData.set("userId", user?.data?.id ?? "anonymous");
      validatedFormData.set("title", validatedTitle);
      validatedFormData.set("subtitle", validatedSubtitle);
      validatedFormData.set("slug", validatedSlug);
      validatedFormData.set("banner", validatedBannerMediaId);
      validatedFormData.set("body", JSON.stringify(validatedBody));

      const result = publishArticle(prevState, validatedFormData);
      const promise = soonerPromise(result);
      sonnerToastPromise(promise, success, error, "Publicando artigo...");

      return result;
    },
    defaultState,
  );

  return (
    <ArticleEditorsWrapper>
      <div className="flex justify-between items-center my-6">
        <ArticleTitle>Escrever novo artigo</ArticleTitle>
        <div className="w-full flex justify-end items-center gap-2">
          <ArticleSaveButton
            action={saveAction}
            isPending={isSavePending}
            keepDisabled={isPublishPending || isSavePending}
          />
          <ArticlePublishButton
            action={publishAction}
            isPending={isPublishPending}
            keepDisabled={isPublishPending || isSavePending}
          />
          <ArticlePopoverButton />
        </div>
      </div>
      <AlertActionErrorList publishState={publishState} />
      <div className="w-full flex flex-col gap-2">
        <ArticleEditorTitle error={publishState?.error?.title} />
        <FieldsetError error={publishState.error?.title?.errors} />
        <ArticleEditorSlug error={publishState?.error?.slug} />
        <FieldsetError error={publishState.error?.slug?.errors} />
        <ArticleEditorSubtitle error={publishState?.error?.subtitle} />
        <FieldsetError error={publishState.error?.subtitle?.errors} />
        <ArticleEditorCategory />
        <ArticleEditorBanner error={publishState?.error?.banner}>
          <FolderBreadcrumbState />
          <FolderCardButtons />
          <Hr className="my-6" />
          <FileCardButtons />
        </ArticleEditorBanner>
        <FieldsetError error={publishState.error?.banner?.errors} />
      </div>
      <div className="mt-2">
        <BlockList blocksErrors={publishState.error?.body?.items} />
      </div>
      <div className="mt-2">
        <AddBlockButton />
      </div>
    </ArticleEditorsWrapper>
  );
}

const AlertActionErrorList = ({
  publishState,
}: {
  publishState: ActionState;
}) => {
  return publishState.error ? (
    <Alert title="Erros" variant="default" className="mb-2">
      {publishState.error && (
        <p className="text-destructive!">{publishState.error}</p>
      )}
      {publishState.error.title &&
        publishState.error.title.errors.map((err: string[], index: number) => (
          <p key={"title-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {publishState.error.subtitle &&
        publishState.error.subtitle.errors.map(
          (err: string[], index: number) => (
            <p key={"subtitle-" + index} className="text-destructive!">
              {err}
            </p>
          ),
        )}
      {publishState.error.slug &&
        publishState.error.slug.errors.map((err: string[], index: number) => (
          <p key={"slug-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {publishState.error.banner &&
        publishState.error.banner.errors.map((err: string[], index: number) => (
          <p key={"banner-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
      {publishState.error.body &&
        publishState.error.body.errors.map((err: string[], index: number) => (
          <p key={"body-" + index} className="text-destructive!">
            {err}
          </p>
        ))}
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
  ) : null;
};

const ArticleEditorsWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
    <form>{children}</form>
  </section>
);

const ArticleTitle = ({ children }: { children: string }) => (
  <h1 className="w-full text-3xl font-extrabold">{children}</h1>
);

const ArticleSaveButton = ({
  action,
  isPending,
  keepDisabled,
}: {
  action: (payload: FormData) => void;
  isPending: boolean;
  keepDisabled?: boolean;
}) => (
  <Button
    type="submit"
    formAction={action}
    disabled={isPending || keepDisabled}
    variant="link"
    className="w-full max-w-30 h-8"
  >
    {isPending && <Spinner />} Salvar
  </Button>
);

const ArticlePublishButton = ({
  action,
  isPending,
  keepDisabled,
}: {
  action: (payload: FormData) => void;
  isPending: boolean;
  keepDisabled?: boolean;
}) => (
  <Button
    type="submit"
    disabled={isPending || keepDisabled}
    formAction={action}
    className="w-full max-w-30 h-8"
  >
    {isPending && <Spinner />} Publicar
  </Button>
);

const ArticlePopoverButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="size-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" className="max-w-fit">
      <Button variant="outline" className="w-full max-w-30 h-8">
        Preview
      </Button>
      <Button variant="outline" className="w-full max-w-30 h-8">
        Despublicar
      </Button>
      <Button variant="destructive" className="w-full max-w-30 h-8">
        Excluir
      </Button>
    </PopoverContent>
  </Popover>
);
