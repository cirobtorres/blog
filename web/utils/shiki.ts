import {
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { BundledLanguage, BundledTheme, createHighlighter } from "shiki";
import { cleanPreCodeBlocks, escapeCharacters } from "./strings-transforms";

const THEMES: BundledTheme[] = ["dark-plus"];
const LANGS: BundledLanguage[] = [
  "tsx",
  "ts",
  "js",
  "py",
  "java",
  "c#",
  "c++",
  "sql",
  "css",
  "shell",
  "bash",
];
export const SHELL: BundledLanguage[] = ["shell", "bash"];
export const LANGUAGES: BundledLanguage[] = [
  "tsx",
  "ts",
  "js",
  "py",
  "java",
  "c#",
  "c++",
];
export const STYLE_LANGUAGES: BundledLanguage[] = ["css"];
export const DB_LANGUAGES: BundledLanguage[] = ["sql"];
const DEFAULT_THEME: BundledTheme = "dark-plus";

export const highlightCodeWithShiki = async ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  const highlighter = await createHighlighter({
    themes: THEMES,
    langs: LANGS,
  });
  // Decode escaped characters
  const htmlDecoded = escapeCharacters(code);

  // Remove <pre><code> tags from tiptap so they do not get rendered duplicated with shiki
  const cleaned = cleanPreCodeBlocks(htmlDecoded);

  const html = highlighter.codeToHtml(cleaned, {
    lang: language || "tsx",
    theme: DEFAULT_THEME,
    transformers: [
      // transformerNotationDiff({
      //   matchAlgorithm: "v3",
      //   // https://shiki.style/packages/transformers#transformernotationdiff
      // }),
      transformerNotationHighlight({
        matchAlgorithm: "v3",
        // https://shiki.style/packages/transformers#transformernotationhighlight
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: "v3",
        // https://shiki.style/packages/transformers#transformernotationwordhighlight
      }),
    ],
  });

  return html;
};

export const formatCodeBlockLanguage = (
  lang: BundledLanguage | null | undefined,
) => {
  switch (lang?.toLocaleLowerCase()) {
    case "tsx":
      return "Next.js";
    case "ts":
      return "Typescript";
    case "js":
      return "Javascript";
    case "py":
      return "Python";
    case "c#":
      return "C#";
    case "c++":
      return "C++";
    case "bash":
      return "Bash";
    case "shell":
      return "Shell";
    case "java":
      return "Java";
    case "sql":
      return "SQL";
    case "css":
      return "CSS";
    default:
      return "Plain Text";
  }
};

export const convertBack = (lang?: string): BundledLanguage => {
  if (!lang) return "tsx";
  switch (lang.toLocaleLowerCase()) {
    case "Next.js":
      return "tsx";
    case "typescript":
      return "ts";
    case "python":
      return "py";
    case "c#":
      return "c#";
    case "c++":
      return "c++";
    case "java":
      return "java";
    case "bash":
      return "bash";
    case "shell":
      return "shell";
    case "sql":
      return "sql";
    case "css":
      return "css";
    default:
      return "tsx";
  }
};
