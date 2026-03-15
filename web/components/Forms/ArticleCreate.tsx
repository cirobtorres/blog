"use client";

import React from "react";
import { PublishButton } from "./buttons/PublishButton";
import { SaveButton } from "./buttons/SaveButton";
import { OptionsButton } from "./buttons/OptionsButton";
import { ArticleEditorTitle } from "../ArticleEditors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../ArticleEditors/editors/ArticleEditorSubtitle";
import { ArticleEditorBanner } from "../ArticleEditors/editors/ArticleEditorBanner";
import { AddAccordionButton } from "../ArticleEditors/addAccordionButton";
import { AddBlockButton, BlockList } from "../ArticleEditors/blocks";

const articleId = "123";

export function ArticleCreate() {
  const [blocks, setBlocks] = React.useState<Blocks[]>([]);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");

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
        <ArticleEditorTitle id={articleId} />
        <ArticleEditorSubtitle id={articleId} />
        <ArticleEditorBanner id={articleId} />
        <BlockList blocks={blocks} setBlocks={setBlocks} />
        <AddBlockButton blocks={blocks} setBlocks={setBlocks} />
      </div>
      <div className="w-full sticky top-1/2 -translate-y-1/2 grid grid-cols-[max-content_1fr] p-2 pl-0 mr-auto ml-0 gap-2 mt-0 mb-auto">
        <PublishButton
          label="Publicar"
          action={onPublishAction}
          className="max-w-xs min-w-60 h-8"
        />
        <OptionsButton />
        <div className="flex flex-col gap-2">
          <SaveButton
            label="Salvar"
            action={onPublishAction}
            className="max-w-xs min-w-60 h-8"
          />
        </div>
      </div>
    </form>
  );
}
