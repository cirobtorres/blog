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

export default function ArticleEditorTag() {
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
      <ComboboxMultiple id="tag-combobox" tags={tags} />
    </div>
  );
}

const ComboboxMultiple = ({ id, tags }: { id?: string; tags: Tag[] }) => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox id={id} multiple autoHighlight items={tags}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: string) => {
                return <ComboboxChip key={value}>{value}</ComboboxChip>;
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
              <ComboboxItem key={item.id} value={item.name}>
                {item.name}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
