"use client";

import React from "react";
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

const queriedTags = [
  "Next.js",
  "Java",
  "Java Spring Boot",
  "Javascript",
  "Python",
  "Django",
  "NestJS",
  "Node.js",
  "Blender",
  "Renders",
  "Renderização",
  "Modelagem 3D",
  "Shading",
  "Animação",
  "Topologia",
  "Material",
  "Textura",
  "Ciência da Computação",
  "Programação",
  "Database",
  "Banco de Dados",
  "Diagramas Entidade Relacionamentos",
] as const;

export default function ArticleEditorCategory() {
  const [tags] = React.useState(queriedTags.toSorted());

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

const ComboboxMultiple = ({
  id,
  tags,
}: {
  id?: string;
  tags: readonly string[];
}) => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox id={id} multiple autoHighlight items={tags}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Nada encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
