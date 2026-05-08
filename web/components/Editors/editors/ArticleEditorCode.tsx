"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import { cn } from "../../../utils/variants";
import CodeBlockShiki from "tiptap-extension-code-block-shiki";
import { BundledLanguage } from "shiki";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../Select";
import React from "react";
import { Fieldset, FieldsetInput, FieldsetLabel } from "../../Fieldset";
import {
  convertBack,
  DB_LANGUAGES,
  formatCodeBlockLanguage,
  LANGUAGES,
  SHELL,
  STYLE_LANGUAGES,
} from "../../../utils/shiki";

export function CodeEditor({
  editorId,
  filenameId,
  defaultValue,
  defaultLanguage,
  defaultFilename,
  setVal,
  setLanguage,
  setFilename,
}: {
  editorId: string;
  filenameId: string;
  defaultValue?: string;
  defaultFilename?: string;
  defaultLanguage?: BundledLanguage;
  setVal: (data: string) => void;
  setLanguage: (data: string) => void;
  setFilename: (data: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Document,
      Text,
      History,
      CodeBlockShiki.extend({
        addKeyboardShortcuts() {
          return {
            ...this.parent?.(),
            ArrowDown: ({ editor }) => {
              const { state } = editor;
              const { $from } = state.selection;
              const after = $from.after();
              if (after !== undefined) {
                return false;
              }
              return true;
            },
            ArrowUp: () => {
              return false;
            },
            Enter: () => {
              return false;
            },
          };
        },
      }).configure({
        defaultTheme: "dark-plus",
        defaultLanguage: defaultLanguage ?? "tsx",
        // themes: {
        //   light: "light-plus",
        //   dark: "dark-plus"
        // }
      }),
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => setVal(editor.getHTML()),
  });

  if (!editor) {
    return <p>Loading...</p>;
  }

  const onLanguageChange = (lang: string) => {
    editor
      .chain()
      .focus()
      .updateAttributes("codeBlock", { language: lang })
      .run();
    setLanguage(lang);
  };

  return (
    <>
      <div className="flex gap-1 mb-1">
        <Fieldset>
          <FieldsetInput
            id={filenameId}
            placeholder="path/to/my/file.py"
            value={defaultFilename ?? "tsx"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilename(e.target.value)
            }
          />
          <FieldsetLabel htmlFor={filenameId} label="Caminho do Arquivo" />
        </Fieldset>
        <LanguageSelect
          defaultLanguage={defaultLanguage}
          setLanguage={onLanguageChange}
        />
      </div>
      <EditorContent
        id={editorId}
        name={editorId}
        editor={editor}
        autoComplete="new-password"
        spellCheck={false}
        onFocus={() => editor.chain().selectTextblockEnd().focus()}
        className={cn(
          "p-1 flex flex-col transition-all duration-300 rounded border bg-white dark:bg-stone-950 has-focus-visible:outline-none has-focus-visible:ring-3 dark:has-focus-visible:ring-2 has-focus-visible:ring-stone-900/25 dark:has-focus-visible:ring-stone-100 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-stone-950 has-focus-visible:border-primary dark:has-focus-visible:border-primary [&_.tiptap.ProseMirror]:h-100 [&_.tiptap.ProseMirror]:overflow-y-auto [&_.tiptap.ProseMirror]:p-2 [&_.tiptap.ProseMirror]:pr-6 [&_.tiptap.ProseMirror]:rounded-b-xs [&_.tiptap.ProseMirror]:outline-none [&_.tiptap.ProseMirror]:transition-all [&_.tiptap.ProseMirror]:scrollbar [&_.tiptap.ProseMirror_h2]:text-lg lg:[&_.tiptap.ProseMirror_h2]:text-2xl [&_.tiptap.ProseMirror_h2]:font-semibold [&_.tiptap.ProseMirror_h2]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h2]:text-neutral-100 [&_.tiptap.ProseMirror_h2]:scroll-m-20 [&_.tiptap.ProseMirror_h2]:tracking-tight [&_.tiptap.ProseMirror_h2]:text-balance [&_.tiptap.ProseMirror_h2]:not-first:mt-6 [&_.tiptap.ProseMirror_h3]:text-lg [&_.tiptap.ProseMirror_h3]:lg:text-xl [&_.tiptap.ProseMirror_h3]:font-semibold [&_.tiptap.ProseMirror_h3]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h3]:text-neutral-100 [&_.tiptap.ProseMirror_h3]:scroll-m-20 [&_.tiptap.ProseMirror_h3]:tracking-tight [&_.tiptap.ProseMirror_h3]:not-first:mt-6 [&_.tiptap.ProseMirror_h4]:text-lg [&_.tiptap.ProseMirror_h4]:lg:text-lg [&_.tiptap.ProseMirror_h4]:font-semibold [&_.tiptap.ProseMirror_h4]:text-neutral-900 dark:[&_.tiptap.ProseMirror_h4]:text-neutral-100 [&_.tiptap.ProseMirror_h4]:scroll-m-20 [&_.tiptap.ProseMirror_h4]:tracking-tight [&_.tiptap.ProseMirror_h4]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-base [&_.tiptap.ProseMirror_p]:font-normal [&_.tiptap.ProseMirror_p]:leading-7 [&_.tiptap.ProseMirror_p]:not-first:mt-6 [&_.tiptap.ProseMirror_p]:text-neutral-900 dark:[&_.tiptap.ProseMirror_p]:text-neutral-400 [&_.tiptap.ProseMirror_strong]:text-primary [&_.tiptap.ProseMirror_strong]:font-bold [&_.tiptap.ProseMirror_mark]:text-neutral-500 [&_.tiptap.ProseMirror_mark]:border dark:[&_.tiptap.ProseMirror_mark]:bg-stone-850 [&_.tiptap.ProseMirror_mark]:px-1 [&_.tiptap.ProseMirror_mark]:rounded-lg [&_.tiptap.ProseMirror_mark]:py-0.5 [&_.tiptap.ProseMirror_a]:text-primary [&_.tiptap.ProseMirror_a]:border dark:[&_.tiptap.ProseMirror_a]:bg-stone-850 [&_.tiptap.ProseMirror_a]:underline [&_.tiptap.ProseMirror_a]:underline-offset-2 [&_.tiptap.ProseMirror_a]:px-1 [&_.tiptap.ProseMirror_a]:rounded-lg [&_.tiptap.ProseMirror_a]:py-0.5 [&_.tiptap.ProseMirror_ul]:not-first:mt-6 [&_.tiptap.ProseMirror_ul]:ml-6 [&_.tiptap.ProseMirror_ul]:list-disc [&_.tiptap.ProseMirror_ul~li]:first:mt-6 [&_.tiptap.ProseMirror_ol]:not-first:mt-6 [&_.tiptap.ProseMirror_ol]:ml-6 [&_.tiptap.ProseMirror_ol]:list-decimal [&_.tiptap.ProseMirror_ol~li]:first:mt-6 [&_.tiptap.ProseMirror_li]:text-neutral-900 dark:[&_.tiptap.ProseMirror_li]:text-neutral-400",
        )}
      />
    </>
  );
}

export function LanguageSelect({
  defaultLanguage,
  setLanguage,
}: {
  defaultLanguage?: string;
  setLanguage: (data: string) => void;
}) {
  const [lang, setLang] = React.useState<BundledLanguage | undefined>(
    convertBack(defaultLanguage) ?? "tsx",
  );
  return (
    <Select
      value={lang ?? "tsx"}
      onValueChange={(val) => {
        setLanguage(val);
        setLang(val.toLowerCase() as BundledLanguage);
      }}
    >
      <SelectTrigger className="w-full min-w-50 flex-1">
        <SelectValue placeholder={formatCodeBlockLanguage(lang)} />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        <SelectGroup>
          <SelectLabel>Linguagens</SelectLabel>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {formatCodeBlockLanguage(lang)}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Estilo</SelectLabel>
          {STYLE_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {formatCodeBlockLanguage(lang)}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Banco de dados</SelectLabel>
          {DB_LANGUAGES.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {formatCodeBlockLanguage(lang)}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Shell</SelectLabel>
          {SHELL.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {formatCodeBlockLanguage(lang)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
