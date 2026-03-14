"use client";

import React from "react";
import { Button } from "../Buttons";
import { ArticleBlockAccordion } from "../ArticleEditors/ArticleBlockAccordion";
import { ArticleEditorTitle } from "../ArticleEditors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../ArticleEditors/ArticleEditorSubtitle";
import { ArticleEditorBanner } from "../ArticleEditors/ArticleEditorBanner";
import { PublishButton } from "./buttons/PublishButton";
import { SaveButton } from "./buttons/SaveButton";
import { ArticleBlockAddEditor } from "../ArticleEditors/ArticleBlockAddEditor";

const id = "123";
const onDelete = (id: string) => console.log("onDelete", id);
const onDisable = (id: string) => console.log("onDisable", id);
const moveDownward = (id: string) => console.log("moveDownward", id);

export function ArticleCreate() {
  const [publishState, onPublishAction, isPublishPending] =
    React.useActionState(async () => {}, null);

  const [saveState, saveAction, isSavePending] = React.useActionState(
    async () => {},
    null,
  );

  return (
    <form className="relative w-full grid grid-cols-[1fr_400px]">
      <div className="w-full max-w-3xl mx-auto p-2 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold my-6">Escrever novo artigo</h1>
        <ArticleEditorTitle id={id} />
        <ArticleEditorSubtitle id={id} />
        <ArticleEditorBanner id={id} />
        <ArticleBlockAccordion
          id={id}
          label="Teste"
          onDelete={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          onDisable={(e) => {
            e.stopPropagation();
            onDisable(id);
          }}
          moveDownward={(e) => {
            e.stopPropagation();
            moveDownward(id);
          }}
        >
          Conteúdo de Teste
        </ArticleBlockAccordion>
        <ArticleBlockAddEditor />
      </div>
      <div className="w-full sticky top-1/2 -translate-y-1/2 grid grid-cols-[max-content_1fr] p-2 pl-0 mr-auto ml-0 gap-2 mt-0 mb-auto">
        <PublishButton
          label="Publicar"
          action={onPublishAction}
          className="max-w-xs min-w-60"
        />
        <Button type="button" variant="outline" className="w-fit">
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
            className=""
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </Button>
        <SaveButton
          label="Salvar"
          action={onPublishAction}
          className="max-w-xs min-w-60"
        />
      </div>
    </form>
  );
}
