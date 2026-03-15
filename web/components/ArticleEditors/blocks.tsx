import React from "react";
import { EditorsAccordion } from "./accordion";
import { HtmlEditor } from "./editors/ArticleEditorHtml";
import { AddAccordionButton } from "./addAccordionButton";

const BlockItem = React.memo(function BlockItem({
  blocks,
  locked,
  updateBlocks,
  onDelete,
  onDisable,
  moveDownward,
}: {
  blocks: Blocks;
  locked: boolean;
  updateBlocks: (id: string, data: UpdateBlocks) => void;
  onDelete: (id: string) => void;
  onDisable: (id: string) => void;
  moveDownward: (id: string) => void;
}) {
  switch (blocks.type) {
    case "html":
      const textEditorId = "input-body-" + blocks.id;
      return (
        <EditorsAccordion
          id={blocks.id}
          label={blocks.id.charAt(0).toUpperCase() + blocks.id.slice(1)}
          locked={locked}
          onDelete={onDelete}
          onDisable={onDisable}
          moveDownward={moveDownward}
        >
          <HtmlEditor
            id={textEditorId}
            setVal={(val) => updateBlocks(blocks.id, { body: val })}
            defaultValue={(blocks.data as HtmlEditor)?.body ?? ""}
          />
        </EditorsAccordion>
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

const BlockList = ({
  blocks,
  setBlocks,
}: {
  blocks: Blocks[];
  setBlocks: React.Dispatch<React.SetStateAction<Blocks[]>>;
}) => {
  const moveDownward = React.useCallback(
    (id: string) => {
      setBlocks((prev) => {
        const index = prev.findIndex((b) => b.id === id);

        if (index === -1 || index === prev.length - 1) {
          return prev;
        }

        const newBlocks = [...prev];
        [newBlocks[index], newBlocks[index + 1]] = [
          newBlocks[index + 1],
          newBlocks[index],
        ];

        return newBlocks;
      });
    },
    [setBlocks],
  );

  const updateBlocks = React.useCallback(
    (id: string, data: UpdateBlocks) => {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id
            ? ({
                ...b,
                data: {
                  ...(b.data as Record<string, unknown>),
                  ...(data as Record<string, unknown>),
                },
              } as Blocks)
            : b,
        ),
      );
    },
    [setBlocks],
  );

  const onDelete = React.useCallback(
    (id: string) => {
      setBlocks((prevBlocks) => prevBlocks.filter((b) => b.id !== id));
    },
    [setBlocks],
  );

  const onDisable = React.useCallback(
    (id: string) => {
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id
            ? ({
                ...b,
                locked: !b.locked,
              } as Blocks)
            : b,
        ),
      );
    },
    [setBlocks],
  );

  const renderedBlocks = React.useMemo(() => {
    return blocks.map((block) => (
      <BlockItem
        key={block.id}
        blocks={block}
        locked={block.locked}
        onDelete={onDelete}
        onDisable={onDisable}
        moveDownward={moveDownward}
        updateBlocks={updateBlocks}
      />
    ));
  }, [blocks, updateBlocks, onDisable, onDelete, moveDownward]);

  return <>{renderedBlocks}</>;
};

const createNewBlock = (
  id: string,
  locked: boolean,
  type: Blocks["type"],
): Blocks => {
  switch (type) {
    case "html":
      return { id, locked, type, data: { body: "" } };

    case "code":
      return {
        id,
        locked,
        type,
        data: { filename: "", code: "", language: "typescript" },
      };

    case "accordion":
      return {
        id,
        locked,
        type,
        data: null,
      };

    case "alert":
      return {
        id,
        locked,
        type,
        data: null,
      };

    case "image":
      return {
        id,
        locked,
        type,
        data: null,
      };

    case "images":
      return {
        id,
        locked,
        type,
        data: null,
      };

    default:
      throw new Error(`Tipo de bloco não suportado: ${type}`);
  }
};

const AddBlockButton = ({
  blocks,
  setBlocks,
}: {
  blocks: Blocks[];
  setBlocks: React.Dispatch<React.SetStateAction<Blocks[]>>;
}) => {
  const [nextId, setNextId] = React.useState(1);

  React.useEffect(() => {
    const usedIds = blocks
      .map((b) => parseInt(b.id.split("-").pop() || "0", 10))
      .filter((n) => !isNaN(n));

    const maxUsedId = usedIds.length > 0 ? Math.max(...usedIds) : 0;
    setNextId(maxUsedId + 1);
  }, [blocks]);

  const addBlock = (type: Blocks["type"]) => {
    const newBlock = createNewBlock(`${type}-${nextId}`, false, type);
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setNextId((prev) => prev + 1);
  };

  return <AddAccordionButton addBlock={addBlock} />;
};

export { BlockList, AddBlockButton };
