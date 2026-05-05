type UpdateBlocks = Partial<Record<string, unknown>>;

// |-----------------------------------------------------------------------------------|
// |---------------------==========Base-For-Accordions==========-----------------------|
// |-----------------------------------------------------------------------------------|
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

// |-----------------------------------------------------------------------------------|
// |---------------------------==========Editors==========-----------------------------|
// |-----------------------------------------------------------------------------------|

// HTML
type HtmlEditor = { body: string };
type HtmlEditorOptions = {
  buttons?: {
    heading?: boolean;
    list?: boolean;
  };
  /** @description Tailwind classes */
  editor?: string;
};

// CODE
type CodeEditor = { filename: string; code: string; language: BundledLanguage };

// ACCORDIONS
type Accordion = { id: string; title: string; body: string };
type AccordionEditor = { accordions: Accordion[] };
type AlertEditor = { type: typeof alertVariants; title: string; body: string };

// IMAGE(s)
type ImageEditor = { id: string; url: string };
type ImagesEditor = ImageEditor[];

// |-----------------------------------------------------------------------------------|
// |----------------------------==========Blocks==========-----------------------------|
// |-----------------------------------------------------------------------------------|
type Blocks =
  | AccordionBlock<{ data: HtmlEditor }>
  | AccordionBlock<{ data: CodeEditor }>
  | AccordionBlock<{ data: AccordionEditor }>
  | AccordionBlock<{ data: AlertEditor }>
  | AccordionBlock<{ data: ImageEditor }>
  | AccordionBlock<{ data: ImagesEditor }>;
