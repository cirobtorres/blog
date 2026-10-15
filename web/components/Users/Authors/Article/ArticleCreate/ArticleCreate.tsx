"use client";

import React from "react";
import * as z from "zod";
import { ArticleEditorTitle } from "../../../../Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../../Editors/editors/ArticleEditorSubtitle";
import { AddBlockButton, BlockList } from "../../../../Editors/blocks";
import { convertToLargeDate } from "../../../../../utils/date";
import { buttonVariants, cn } from "../../../../../utils/variants";
import { sonnerToastPromise, sonnerPromise } from "../../../../../utils/sonner";
import { FieldsetError } from "../../../../Fieldset";
import { publishArticleSchema } from "../../../../../services/article/zod-validations";
import postArticle from "../../../../../services/article/postArticle";
import ArticleEditorSlug from "../../../../Editors/editors/ArticleEditorSlug";
import ArticleEditorTag from "../../../../Editors/editors/ArticleEditorTag";
import InputAlerts from "../AlertErrorList";
import ArticleButton from "../ArticleButton";
import { useRouter } from "next/navigation";
import {
  ArticleBannerButton,
  ArticleMediaManager,
} from "../../../../Editors/editors/ArticleEditorImage";
import { ArticleStoreProvider } from "../../../../../providers/ArticleStoreProvider";
import { useSession } from "next-auth/react";
import BlocksInput from "../BlocksInput";
import { Col, Row } from "../utils";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const user = session?.user;
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const [errors, setErrors] = React.useState<ArticleErrors | null | undefined>(
    null,
  );
  const [, setIsOpenState] = React.useState(false);
  const { replace } = useRouter();

  const [state, action, isPending] = React.useActionState(
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

      const result = postArticle(prevState, formData);
      const promise = sonnerPromise(result);
      sonnerToastPromise(promise, success, error, "Salvando artigo...");
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

    React.startTransition(() => {
      action(formData);
    });
  };

  return (
    <ArticleStoreProvider>
      <ArticleMediaManager />
      <section className="w-full max-w-6xl mx-auto px-2 my-6 flex-1 flex flex-col">
        <form
          action={action}
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-2"
        >
          <Row className="justify-between mb-6">
            <Col>
              <h1 className="text-3xl font-extrabold">Escrever novo artigo</h1>
            </Col>
            <Col className="flex justify-end items-center gap-2">
              <ArticleButton
                variant="link"
                disabled={isPending}
                className="w-full max-w-30 h-8"
              >
                Salvar
              </ArticleButton>
              <PublishPlaceholder />
              <MenuPlaceholder />
            </Col>
          </Row>
          <InputAlerts state={state} />
          <Row className="gap-2">
            <Col>
              <ArticleEditorTitle error={!!errors?.title?.errors} />
              <FieldsetError error={errors?.title?.errors} />
            </Col>
            <Col>
              <ArticleEditorSubtitle
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
              <ArticleEditorSlug error={!!errors?.slug?.errors} />
              <FieldsetError error={errors?.slug?.errors} />
            </Col>
          </Row>
          <ArticleBannerButton error={!!errors?.banner?.errors} />
          <FieldsetError error={errors?.banner?.errors} />
          <BlocksInput />
          <BlockList />
          <AddBlockButton />
        </form>
      </section>
    </ArticleStoreProvider>
  );
}

const PublishPlaceholder = () => {
  return (
    <div
      className={cn(
        buttonVariants(),
        "w-full max-w-30 h-8 cursor-auto opacity-50 hover:bg-primary/75",
      )}
    >
      Publicar
    </div>
  );
};

const MenuPlaceholder = () => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "cursor-auto size-8 opacity-50",
      )}
    >
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
    </div>
  );
};
