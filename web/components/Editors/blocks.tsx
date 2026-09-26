"use client";

import React from "react";
import { EditorsAccordion } from "./accordion";
import { HtmlEditor } from "./editors/ArticleEditorHtml";
import { CodeEditor } from "./editors/ArticleEditorCode";
import { AddAccordionButton } from "./addAccordionButton";
import { FieldsetError } from "../Fieldset";
import AlertEditor from "./editors/ArticleEditorAlert";
import AccordionEditor from "./editors/ArticleEditorAccordion";
import {
  ArticleImageButton,
  ArticleImagesButton,
} from "./editors/ArticleEditorImage";
import { useArticleStore } from "../../providers/ArticleStoreProvider";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

const BlockItem = React.memo(function BlockItem({
  block,
  error,
  ...dndProps // Comes to BlockItem through prop-drilling
}: {
  block: Blocks;
  error?: BlockPropertyErrors;
  attributes?: ReturnType<typeof useSortable>["attributes"];
  listeners?: ReturnType<typeof useSortable>["listeners"];
}) {
  const {
    updateBlock,
    deleteBlock,
    toggleBlockLock,
    moveBlockDownward,
    openMediaLibrary,
  } = useArticleStore();
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
            {...dndProps}
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
      const filenameEditorId = "input-filename-" + block.id;
      const codeEditorId = "input-code-" + block.id;
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
            {...dndProps}
          >
            <CodeEditor
              editorId={codeEditorId}
              filenameId={filenameEditorId}
              defaultValue={(block.data as CodeEditor)?.code ?? ""}
              setVal={(val) => updateBlock(block.id, { code: val })}
              defaultLanguage={(block.data as CodeEditor)?.language ?? "tsx"}
              setLanguage={(val) => updateBlock(block.id, { language: val })}
              defaultFilename={(block.data as CodeEditor)?.filename ?? ""}
              setFilename={(val) => updateBlock(block.id, { filename: val })}
            />
          </EditorsAccordion>
          <FieldsetError error={dataErrors?.code?.errors} />
        </>
      );
    case "accordion":
      return (
        <EditorsAccordion
          id={block.id}
          label={block.id.charAt(0).toUpperCase() + block.id.slice(1)}
          locked={block.locked}
          onDelete={deleteBlock}
          onDisable={toggleBlockLock}
          moveDownward={moveBlockDownward}
          hasError={!!error}
          {...dndProps}
        >
          <AccordionEditor
            accordions={(block.data as AccordionEditor)?.accordions ?? null}
            setAccordions={(val: Accordion[]) =>
              updateBlock(block.id, { accordions: val })
            }
          />
        </EditorsAccordion>
      );
    case "image":
      const image = block.data as ImageEditor;
      return (
        <EditorsAccordion
          id={block.id}
          label={block.id.charAt(0).toUpperCase() + block.id.slice(1)}
          locked={block.locked}
          onDelete={deleteBlock}
          onDisable={toggleBlockLock}
          moveDownward={moveBlockDownward}
          hasError={!!error}
          {...dndProps}
        >
          <ArticleImageButton
            blockId={block.id}
            text="Selecionar Imagem"
            onClick={() => openMediaLibrary(block.id)}
            data={image}
          />
        </EditorsAccordion>
      );
    case "images":
      return (
        <EditorsAccordion
          id={block.id}
          label={block.id.charAt(0).toUpperCase() + block.id.slice(1)}
          locked={block.locked}
          onDelete={deleteBlock}
          onDisable={toggleBlockLock}
          moveDownward={moveBlockDownward}
          hasError={!!error}
          {...dndProps}
        >
          <ArticleImagesButton
            blockId={block.id}
            text="Selecionar Imagens"
            onClick={() => openMediaLibrary(block.id)}
            images={(block.data as ImagesEditor)?.images ?? []}
            setImages={(val) => updateBlock(block.id, { images: val })}
          />
        </EditorsAccordion>
      );
    case "alert":
      const alertEditorTitleId = "input-alert-title-" + block.id;
      const alertEditorTypeId = "input-alert-type-" + block.id;
      const alertEditorHtmlId = "input-alert-body-" + block.id;
      return (
        <EditorsAccordion
          id={block.id}
          label={block.id.charAt(0).toUpperCase() + block.id.slice(1)}
          locked={block.locked}
          onDelete={deleteBlock}
          onDisable={toggleBlockLock}
          moveDownward={moveBlockDownward}
          hasError={!!error}
          {...dndProps}
        >
          <AlertEditor
            titleId={alertEditorTitleId}
            typeId={alertEditorTypeId}
            htmlId={alertEditorHtmlId}
            defaultTitle={(block.data as AlertEditor)?.title ?? ""}
            setTitle={(val) => updateBlock(block.id, { title: val })}
            defaultType={(block.data as AlertEditor)?.type ?? "default"}
            setType={(val) => updateBlock(block.id, { type: val })}
            defaultValue={(block.data as AlertEditor)?.body ?? ""}
            setVal={(val) => updateBlock(block.id, { body: val })}
          />
        </EditorsAccordion>
      );
    default:
      return null;
  }
});

const BlockList = ({ blocksErrors }: { blocksErrors?: BodyItemError[] }) => {
  const { blocks, setBlocks } = useArticleStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    setBlocks(arrayMove(blocks, oldIndex, newIndex));
  };

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
    blocks.length > 0 && (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {blocks.map((block: Blocks) => (
              <SortableBlockItem key={block.id} id={block.id}>
                <BlockItem block={block} error={errorMap[block.id]} />
              </SortableBlockItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    )
  );
};

const SortableBlockItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform), // Translate only, no scaling
        transition,
        zIndex: isDragging ? 10 : undefined,
        position: "relative",
      }}
      className={isDragging ? "opacity-70" : undefined}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children, { attributes, listeners } as {
            attributes: ReturnType<typeof useSortable>["attributes"];
            listeners: ReturnType<typeof useSortable>["listeners"];
          })
        : children}
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
        data: { filename: "", code: "", language: "tsx" },
      };
    case "image":
      return {
        ...base,
        type: "image",
        data: { id: "", url: "", alt: "", caption: "" },
      };
    case "images":
      return {
        ...base,
        type: "images",
        data: { images: [] },
      };
    case "alert":
      return {
        ...base,
        type: "alert",
        data: { title: "", type: "default", body: "" },
      };
    case "accordion":
      return {
        ...base,
        type: "accordion",
        data: {
          accordions: [{ id: crypto.randomUUID(), title: "", body: "" }],
        },
      };
    default:
      throw new Error("Tipo inválido");
  }
};

const AddBlockButton = () => {
  const { blocks, setBlocks } = useArticleStore();

  const addBlock = (type: Blocks["type"]) => {
    const ids = blocks
      .map((b) => parseInt(b.id.split("-").pop() || "0", 10))
      .filter((n) => !isNaN(n));
    const nextId = (ids.length > 0 ? Math.max(...ids) : 0) + 1;
    const newBlock = createNewBlock(`${type}-${nextId}`, false, type);
    setBlocks([...blocks, newBlock]);
  };

  return <AddAccordionButton addBlock={addBlock} />;
};

export function ArticleBlockButtons() {
  return <AddBlockButton />;
}

export { BlockList, AddBlockButton };
