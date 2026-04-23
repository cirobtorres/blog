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

export default function ArticleEditorTag({
  defaultTags,
  error,
}: {
  defaultTags?: Tag[];
  error?: boolean;
}) {
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
      <TagComboboxMultiple
        defaultTags={defaultTags}
        id="tag-combobox"
        tags={tags}
        error={error}
      />
    </div>
  );
}

const repeatMap = (filtered: Tag[], listToBeFiltered: Tag[]) => {
  return filtered
    .map((dt) => listToBeFiltered.find((t) => t.id === dt.id))
    .filter(Boolean) as Tag[];
};

const TagComboboxMultiple = ({
  id,
  tags,
  error,
  defaultTags,
}: {
  id?: string;
  tags: Tag[];
  error?: boolean;
  defaultTags?: Tag[];
}) => {
  const anchor = useComboboxAnchor();
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(() => {
    if (!defaultTags) return [];
    return repeatMap(defaultTags, tags);
  });

  React.useEffect(() => {
    if (defaultTags) {
      setSelectedTags(repeatMap(defaultTags, tags));
    }
  }, [tags, defaultTags]);

  return (
    <>
      <input
        type="hidden"
        name="tags"
        value={JSON.stringify(selectedTags.map((t) => t.id))}
      />
      <Combobox
        id={id}
        multiple
        autoHighlight
        items={tags}
        value={selectedTags}
        onValueChange={setSelectedTags}
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
    </>
  );
};
