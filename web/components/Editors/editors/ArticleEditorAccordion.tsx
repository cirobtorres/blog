"use client";

import React from "react";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../Fieldset";
import { HtmlEditor } from "./ArticleEditorHtml";
import { Button } from "../../Button";

type AccordionStateAction =
  | { type: "ADD" }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_CHECK"; id: string; value: boolean }
  | { type: "UPDATE_TITLE"; id: string; value: string }
  | { type: "UPDATE_BODY"; id: string; value: string };

const initialAccordionState: Accordion[] = [
  { id: crypto.randomUUID(), title: "", body: "" },
];

const accordionReducer = (
  state: Accordion[],
  action: AccordionStateAction,
): Accordion[] => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: crypto.randomUUID(), title: "", body: "" }];

    case "REMOVE":
      if (state.length === 1) return state;
      return state.filter((item) => item.id !== action.id);

    case "UPDATE_CHECK":
      return state.map((item) =>
        item.id === action.id ? { ...item, checked: action.value } : item,
      );

    case "UPDATE_TITLE":
      return state.map((item) =>
        item.id === action.id ? { ...item, title: action.value } : item,
      );

    case "UPDATE_BODY":
      return state.map((item) =>
        item.id === action.id ? { ...item, body: action.value } : item,
      );

    default:
      return state;
  }
};

export default function AccordionEditor({
  ...props
}: {
  accordions?: Accordion[];
  setAccordions: (data: Accordion[]) => void;
}) {
  const [accordions, baseDispatch] = React.useReducer(
    accordionReducer,
    props.accordions || initialAccordionState,
  );

  const accordDispatch = (action: AccordionStateAction) => {
    const newState = accordionReducer(accordions, action);
    props.setAccordions(newState); // Updates parent component
    baseDispatch(action);
  };

  const htmlEditorOptions: { options: HtmlEditorOptions } = {
    options: {
      buttons: {
        heading: false,
        list: false,
      },
      editor: "[&_.tiptap.ProseMirror]:h-fit",
    },
  };

  return (
    <>
      {accordions.map((accordion, index) => {
        const uniqueTitleId = `accordion-title-${crypto.randomUUID()}`;
        const uniqueBodyId = `accordion-body-${crypto.randomUUID()}`;
        return (
          <div key={accordion.id} className="flex gap-1 mb-1">
            <RemoveAccordionButton
              type="button"
              disabled={index === 0}
              onClick={() =>
                accordDispatch({ type: "REMOVE", id: accordion.id })
              }
              className="size-9.5"
            />
            <div className="w-full flex-1 flex flex-col">
              <Fieldset className="mb-1">
                <FieldsetInput
                  id={uniqueTitleId}
                  value={accordion.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    accordDispatch({
                      type: "UPDATE_TITLE",
                      id: accordion.id,
                      value: e.target.value,
                    })
                  }
                />
                <FieldsetLabel label="Título" />
              </Fieldset>
              <HtmlEditor
                id={uniqueBodyId}
                defaultValue={accordion.body}
                setVal={(val) =>
                  accordDispatch({
                    type: "UPDATE_BODY",
                    id: accordion.id,
                    value: val,
                  })
                }
                {...htmlEditorOptions}
              />
            </div>
          </div>
        );
      })}
      <AddAccordionButton
        type="button"
        onClick={() => accordDispatch({ type: "ADD" })}
        className="size-9.5"
      />
    </>
  );
}

const AddAccordionButton = (props: BlogButton) => (
  <div className="flex justify-center">
    <Button {...props}>
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
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </Button>
  </div>
);

const RemoveAccordionButton = (props: BlogButton) => (
  <div className="flex justify-center">
    <Button variant="destructive" {...props}>
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
        className="stroke-neutral-900 dark:stroke-neutral-100"
      >
        <path d="M5 12h14" />
      </svg>
    </Button>
  </div>
);
