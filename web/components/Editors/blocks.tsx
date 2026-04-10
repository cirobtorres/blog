"use client";

import React from "react";
import { EditorsAccordion } from "./accordion";
import { HtmlEditor } from "./editors/ArticleEditorHtml";
import { AddAccordionButton } from "./addAccordionButton";
import { FieldsetError } from "../Fieldset";
import { useArticleStore } from "../../zustand-store/article-state";

const BlockItem = React.memo(function BlockItem({
  block,
  error,
}: {
  block: Blocks;
  error?: BlockPropertyErrors;
}) {
  const { updateBlock, deleteBlock, toggleBlockLock, moveBlockDownward } =
    useArticleStore();
  const dataErrors = error?.data?.properties as BlockDataErrors | undefined;

  switch (block.type) {
    case "html":
      const textEditorId = "input-body-" + block.id;
      return (
        <>
          <EditorsAccordion
            id={block.id}
            label={block.id.charAt(0).toUpperCase() + block.id.slice(1)}
            locked={block.locked}
            onDelete={deleteBlock}
            onDisable={toggleBlockLock}
            moveDownward={moveBlockDownward}
            hasError={!!error}
          >
            <HtmlEditor
              id={textEditorId}
              setVal={(val) => updateBlock(block.id, { body: val })}
              defaultValue={(block.data as HtmlEditor)?.body ?? ""}
            />
          </EditorsAccordion>
          <FieldsetError error={dataErrors?.body?.errors} />
        </>
      );
    case "code":
      return;
    case "accordion":
      return;
    case "image":
      return;
    case "images":
      return;
    case "alert":
      return;
    default:
      return null;
  }
});

const BlockList = ({ blocksErrors }: { blocksErrors?: BodyItemError[] }) => {
  const blocks = useArticleStore((state) => state.blocks);

  const errorMap = React.useMemo(() => {
    const map: Record<string, BlockPropertyErrors> = {};
    if (blocksErrors) {
      blocksErrors.forEach((item, index) => {
        const blockId = blocks[index]?.id;
        if (blockId && item.properties) {
          map[blockId] = item.properties;
        }
      });
    }
    return map;
  }, [blocksErrors, blocks]);

  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} error={errorMap[block.id]} />
      ))}
    </div>
  );
};

const createNewBlock = (
  id: string,
  locked: boolean,
  type: BlockType,
): Blocks => {
  const base = { id, locked, type };

  switch (type) {
    case "html":
      return { ...base, type: "html", data: { body: "" } };
    case "code":
      return {
        ...base,
        type: "code",
        data: { filename: "", code: "", language: "typescript" },
      };
    case "image":
      return { ...base, type: "image", data: { url: "" } };
    case "alert":
      return { ...base, type: "alert", data: null };
    case "accordion":
      return { ...base, type: "accordion", data: null };
    case "images":
      return { ...base, type: "images", data: null };
    default:
      throw new Error("Tipo inválido");
  }
};

const AddBlockButton = () => {
  const { blocks, setBlocks } = useArticleStore();

  const addBlock = (type: Blocks["type"]) => {
    const usedIds = blocks
      .map((b) => parseInt(b.id.split("-").pop() || "0", 10))
      .filter((n) => !isNaN(n));
    const nextId = (usedIds.length > 0 ? Math.max(...usedIds) : 0) + 1;

    const newBlock = createNewBlock(`${type}-${nextId}`, false, type);
    setBlocks([...blocks, newBlock]);
  };

  return <AddAccordionButton addBlock={addBlock} />;
};

export function ArticleBlockButtons() {
  return <AddBlockButton />;
}

export { BlockList, AddBlockButton };
