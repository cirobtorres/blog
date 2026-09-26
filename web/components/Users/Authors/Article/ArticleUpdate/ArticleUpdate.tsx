"use client";

import React from "react";
import * as z from "zod";
import { ArticleEditorTitle } from "../../../../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../../../../Editors/blocks";
import { convertToLargeDate, mountURL } from "../../../../../utils/date";
import { useRouter } from "next/navigation";
import { cn, focusRing } from "../../../../../utils/variants";
import { sonnerToastPromise, sonnerPromise } from "../../../../../utils/sonner";
import { Button } from "../../../../Button";
import { FieldsetError } from "../../../../Fieldset";
import { toast } from "sonner";
import { publishArticleSchema } from "../../../../../services/article/zod-validations";
import { ArticlePopoverButton } from "../ArticlePopoverButton";
import ArticleEditorSlug from "../../../../Editors/editors/ArticleEditorSlug";
import ArticleEditorTag from "../../../../Editors/editors/ArticleEditorTag";
import ArticleButton from "../ArticleButton";
import InputAlerts from "../AlertErrorList";
import putSaveArticle from "../../../../../services/article/putSaveArticle";
import putPublishArticle from "../../../../../services/article/putPublishArticle";
import {
  ArticleBannerButton,
  ArticleMediaManager,
} from "../../../../Editors/editors/ArticleEditorImage";
import { ArticleStoreProvider } from "../../../../../providers/ArticleStoreProvider";
import { useSession } from "next-auth/react";
import { Alert } from "../../../../Alert";
import { parseBlocks } from "../../../../../utils/editors";
import BlocksInput from "../BlocksInput";

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

export function ArticleUpdate(article: Article) {
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user;
  const [errors, setErrors] = React.useState<ArticleErrors | null | undefined>(
    null,
  );
  const [, setIsOpenState] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(
    () => article.tags,
  );

  const router = useRouter();

  const [saveState, saveAction, isSavePending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (!user?.id) {
        return {
          ...defaultState,
          error: ["Você precisa estar logado"],
        };
      }

      formData.set("userId", user.id);

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
      if (!user?.id) {
        return {
          ...defaultState,
          error: ["Você precisa estar logado"],
        };
      }

      formData.set("userId", user.id);

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

      const result = putPublishArticle(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Publicando artigo...");
      return result;
    },
    defaultState,
  );

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nativeEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement | null;
    const intent = submitter?.value; // save / publish
    const formData = new FormData(event.currentTarget);

    if (!intent) {
      console.warn("Não foi possível identificar o botão clicado.");
      return;
    }

    if (intent === "publish") {
      const rawData = Object.fromEntries(formData.entries());
      const result = publishArticleSchema.safeParse(rawData);

      if (!result.success) {
        const error = z.treeifyError(result.error).properties;
        setErrors(error);
        return;
      }
    }

    setErrors(null);

    React.startTransition(() => {
      if (intent === "publish") {
        publishAction(formData);
      } else {
        saveAction(formData);
      }
    });
  };

  const initialBlocks = React.useMemo(
    () => parseBlocks(article.body),
    [article.body],
  );

  return (
    <ArticleStoreProvider
      key={article.id}
      initial={{
        title: article.title,
        slug: article.slug,
        bannerMediaId: article.banner?.id ?? null,
        bannerUrl: article.banner?.url ?? null,
        bannerAlt: article.banner?.alt ?? null,
        blocks: initialBlocks,
      }}
    >
      <ArticleMediaManager />
      <section className="w-full max-w-6xl mx-auto px-2 my-6 flex-1 flex flex-col">
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-2">
          <HiddenInputs {...article} />
          <Row className="justify-between mb-4">
            <Col>
              <h1 className="text-3xl font-extrabold">Editar artigo</h1>
            </Col>
            <Col className="flex justify-end items-center gap-2">
              <Buttons
                disabled={isPublishPending || isSavePending}
                {...article}
              />
            </Col>
          </Row>
          <InputAlerts state={saveState || publishState} />
          <FormAlerts {...article} />
          <Row className="gap-2">
            <Col>
              <ArticleEditorTitle
                defaultVal={article.title}
                error={!!errors?.title?.errors}
              />
              <FieldsetError error={errors?.title?.errors} />
            </Col>
            <Col>
              <ArticleEditorSubtitle
                defaultVal={article.subtitle}
                maxLength={200}
                error={!!errors?.subtitle?.errors}
              />
              <FieldsetError error={errors?.subtitle?.errors} />
            </Col>
          </Row>
          <Row className="gap-2">
            <Col>
              <ArticleEditorTag
                tags={selectedTags}
                setTags={setSelectedTags}
                error={!!errors?.tags?.errors}
              />
              <FieldsetError error={errors?.tags?.errors} />
            </Col>
            <Col>
              <ArticleEditorSlug
                articleId={article.id}
                defaultVal={article.slug}
                error={!!errors?.slug?.errors}
              />
              <FieldsetError error={errors?.slug?.errors} />
            </Col>
          </Row>
          <ArticleBannerButton />
          <FieldsetError error={errors?.banner?.errors} />
          <BlockList defaultVal={article.body} />
          <AddBlockButton />
        </form>
      </section>
    </ArticleStoreProvider>
  );
}

const Buttons = ({ disabled, ...article }: Article & { disabled: boolean }) => (
  <>
    <ArticleButton
      type="submit"
      name="intent"
      value="save"
      variant="link"
      disabled={disabled}
      className="w-full max-w-30 h-8"
    >
      Salvar
    </ArticleButton>
    <ArticleButton
      type="submit"
      name="intent"
      value="publish"
      disabled={disabled}
      className="w-full max-w-30 h-8"
    >
      Publicar
    </ArticleButton>
    <ArticlePopoverButton articleId={article.id} status={article.status} />
  </>
);

const Row = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { className?: string }) => (
  <div
    className={cn(
      "w-full flex flex-row justify-center items-center",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Col = ({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { className?: string }) => (
  <div className={cn("w-full", className)} {...props}>
    {children}
  </div>
);

const HiddenInputs = ({ ...article }: Article) => (
  <>
    <input
      hidden
      type="hidden"
      className="appearance-none"
      name="id"
      value={article.id}
    />
    <input
      hidden
      type="hidden"
      className="appearance-none"
      name="status"
      value={article.status}
    />
    <BlocksInput />
  </>
);

const FormAlerts = ({ ...article }: Article) =>
  article.hasUnpublishedChanges && (
    <Alert title="Tem informação salva ainda não publicada" variant="warn">
      <p>Existem alterações salvas, mas que estão pendentes de publicação.</p>
    </Alert>
  );
