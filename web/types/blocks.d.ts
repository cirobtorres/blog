type UpdateBlocks = Partial<Record<string, unknown>>;

type BlockType<T extends object> = T & {
  id: string;
  locked: boolean;
  type: "html" | "code" | "accordion" | "alert" | "image" | "images";
};

type HtmlEditor = { body: string };
type CodeEditor = { filename: string; code: string; language: BundledLanguage };
type AccordionEditor = null;
type AlertEditor = null;
type ImageEditor = null;
type ImagesEditor = null;

type Blocks =
  | BlockType<{ data: HtmlEditor }>
  | BlockType<{ data: CodeEditor }>
  | BlockType<{ data: AccordionEditor }>
  | BlockType<{ data: AlertEditor }>
  | BlockType<{ data: ImageEditor }>
  | BlockType<{ data: ImagesEditor }>;
