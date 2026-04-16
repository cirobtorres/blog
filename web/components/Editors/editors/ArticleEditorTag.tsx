"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "../../Combobox";
import { useTags } from "../../../services/hooks/tags/hook-tags";
import React from "react";

export default function ArticleEditorTag({ error }: { error?: boolean }) {
  const { data } = useTags();
  const { content: tags, page } = data ? data : { content: [] };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="tag-combobox"
        className="text-neutral-600 dark:text-neutral-500 font-medium mb-2"
      >
        Tags
      </label>
      <TagComboboxMultiple id="tag-combobox" tags={tags} error={error} />
    </div>
  );
}

const TagComboboxMultiple = ({
  id,
  tags,
  error,
}: {
  id?: string;
  tags: Tag[];
  error?: boolean;
}) => {
  const anchor = useComboboxAnchor();
  // Agora o estado armazena IDs (strings de UUID, presumo)
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>([]);

  return (
    <>
      <input
        hidden
        type="hidden"
        name="tags"
        // Envia o array de IDs serializado
        value={JSON.stringify(selectedTagIds)}
      />
      <Combobox
        id={id}
        multiple
        autoHighlight
        items={tags}
        value={selectedTagIds}
        onValueChange={setSelectedTagIds}
      >
        <ComboboxChips ref={anchor} error={error}>
          <ComboboxValue>
            {(values: string[]) => (
              <>
                {values.map((id: string) => {
                  const tag = tags.find((t) => t.id === id);
                  return (
                    <ComboboxChip key={id}>{tag ? tag.name : id}</ComboboxChip>
                  );
                })}
                <ComboboxChipsInput />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>Nada encontrado.</ComboboxEmpty>
          <ComboboxList>
            {(item: Tag) => {
              return (
                <ComboboxItem key={item.id} value={item.id}>
                  {item.name}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
};
