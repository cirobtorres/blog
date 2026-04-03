type UpdateBlocks = Partial<Record<string, unknown>>;

type BlockType =
  | "html"
  | "code"
  | "accordion"
  | "alert"
  | "image"
  | "images"
  | "video";

type AccordionBlock<T extends object> = T & {
  id: string;
  locked: boolean;
  type: BlockType;
};

type HtmlEditor = { body: string };
type CodeEditor = { filename: string; code: string; language: BundledLanguage };
type AccordionEditor = null;
type AlertEditor = null;
type ImageEditor = { url: string };
type ImagesEditor = null;

type Blocks =
  | AccordionBlock<{ data: HtmlEditor }>
  | AccordionBlock<{ data: CodeEditor }>
  | AccordionBlock<{ data: AccordionEditor }>
  | AccordionBlock<{ data: AlertEditor }>
  | AccordionBlock<{ data: ImageEditor }>
  | AccordionBlock<{ data: ImagesEditor }>;
