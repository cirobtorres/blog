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

const repeatMap = (filtered: Tag[], listToBeFiltered: Tag[]) => {
  return filtered
    .map((dt) => listToBeFiltered.find((t) => t.id === dt.id))
    .filter(Boolean) as Tag[];
};

export default function ArticleEditorTag({
  tags,
  setTags,
  error,
}: {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  error?: boolean;
}) {
  const anchor = useComboboxAnchor();
  const { data } = useTags();
  const { content: allTags, page } = data ? data : { content: [] };
  const selectedTags = repeatMap(tags, allTags);

  return (
    <div className="flex flex-col">
      <label
        htmlFor="tag-combobox"
        className="text-neutral-600 dark:text-neutral-500 font-medium mb-2"
      >
        Tags
      </label>
      <input
        type="hidden"
        name="tags"
        value={JSON.stringify(tags.map((t) => t.id))}
      />
      <Combobox
        id="tag-combobox"
        multiple
        autoHighlight
        items={allTags}
        value={selectedTags}
        onValueChange={setTags}
      >
        <ComboboxChips ref={anchor} error={error}>
          <ComboboxValue>
            {(values: Tag[]) => (
              <>
                {values.map((tag: Tag) => {
                  return <ComboboxChip key={tag.id}>{tag.name}</ComboboxChip>;
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
                <ComboboxItem key={item.id} value={item}>
                  {item.name}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
