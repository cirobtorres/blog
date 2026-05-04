"use client";

import React from "react";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../Fieldset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import { HtmlEditor } from "./ArticleEditorHtml";
import { alertVariants } from "../../../utils/variants";

export default function AlertEditor({
  titleId,
  typeId,
  htmlId,
  defaultValue,
  setVal,
  defaultTitle,
  setTitle,
  defaultType,
  setType,
}: {
  titleId: string;
  typeId: string;
  htmlId: string;
  defaultValue?: string;
  setVal: (data: string) => void;
  defaultTitle?: string;
  setTitle: (data: string) => void;
  defaultType?: keyof typeof alertVariants;
  setType: (data: string) => void;
}) {
  return (
    <>
      <div className="flex gap-1 mb-1">
        <Fieldset>
          <FieldsetInput
            id={titleId}
            value={defaultTitle ?? "default"}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={65}
          />
          <FieldsetLabel label="Título" />
        </Fieldset>
        <TypeSelect
          id={typeId}
          defaultType={defaultType ?? types[0]}
          setType={setType}
        />
      </div>
      <HtmlEditor id={htmlId} setVal={setVal} defaultValue={defaultValue} />
    </>
  );
}

const TypeSelect = ({
  id,
  defaultType,
  setType,
}: {
  id: string;
  defaultType: string;
  setType: (data: string) => void;
}) => {
  return (
    <Select
      value={defaultType}
      onValueChange={(val) => {
        setType(val.toLowerCase());
      }}
    >
      <SelectTrigger id={id} className="w-full min-w-50 flex-1">
        <SelectValue placeholder={defaultType} />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {types.map((type: string) => {
          const t = type.toLowerCase();
          return (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

const types = ["default", "info", "warn", "success", "alert"];
