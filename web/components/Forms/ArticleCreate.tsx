"use client";

import React from "react";
import { Button } from "../Buttons";
import { ArticleBlockEditor } from "../ArticleEditors/ArticleBlockEditor";

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
    <form className="w-full grid grid-cols-[800px_1fr]">
      <div className="w-full p-2">
        <ArticleBlockEditor
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
          Conteúdo
        </ArticleBlockEditor>
      </div>
      <div className="flex flex-col p-2 pl-0 gap-2">
        <div className="flex gap-2">
          <Button className="w-full max-w-xs">Publicar</Button>
          <Button variant="outline">
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
        </div>
        <Button className="max-w-xs" variant="outline">
          Salvar
        </Button>
      </div>
    </form>
  );
}
