"use client";

import ScrollSummary from "./ScrollSummary";
import React from "react";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import { slugify } from "../../../utils/strings-transforms";
import ArticleContent from "./ArticleContent";
import BackToTopButton from "./BackToTopButton";
import { alertVariants, cn, focusRing } from "../../../utils/variants";
import * as Typography from "../../Typography";
import NextLink from "next/link";
import CopyToClipBoard from "../../CopyToClipBoard";
import { highlightCodeWithShiki } from "../../../utils/shiki";
import Spinner from "../../Spinner";
import { Alert } from "../../Alert";

const typographyMap: Record<string, React.ElementType> = {
  h2: Typography.H2,
  h3: Typography.H3,
  h4: Typography.H4,
  p: Typography.P,
  mark: Typography.Mark,
  a: Typography.A,
  blockquote: Typography.Blockquote,
  ul: Typography.Ul,
  ol: Typography.Ol,
  li: Typography.Li,
};

export default function ArticleBody({ body }: Article) {
  const { anchors, processedNodes } = React.useMemo(() => {
    const blocks: Blocks[] = JSON.parse(body);
    return processBlocks(blocks);
  }, [body]);

  return (
    <div className="w-full max-w-article-body mx-auto px-6">
      <section className="relative grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-2">
        <ScrollSummary anchors={anchors} />
        <ArticleContent>
          {processedNodes.map((node, index) => (
            <React.Fragment key={index}>{node}</React.Fragment>
          ))}
        </ArticleContent>
        <div className="sticky size-fit hidden lg:block top-[calc(50%-var(--height-header))] ml-auto mr-0">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}

export function processBlocks(blocks: Blocks[]) {
  const anchors: { id: string; text: string }[] = [];

  const replaceOptions = (domNode: DOMNode) => {
    if (domNode.type !== "tag") return;

    const element = domNode as Element;
    const tagName = element.name.toLowerCase();
    const Component = typographyMap[tagName];

    // Headings (IDs + Anchors + Typography)
    if (/h[2-4]/.test(tagName)) {
      const text = element.children
        .map((c) => (c.type === "text" ? c.data : ""))
        .join("");

      const id = slugify(text);
      anchors.push({ id, text });

      const Component = typographyMap[tagName];
      const children = domToReact(element.children as DOMNode[]);

      return (
        <Component id={id}>
          <NextLink
            href={`#${id}`}
            className={cn(
              "w-fit flex items-center gap-2 rounded border border-transparent transition-shadow duration-300 group", // scroll-mt-[var(--header-height)]
              focusRing,
            )}
          >
            {children}
            <LinkIcon className="ml-2 mb-1 p-1 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
          </NextLink>
        </Component>
      );
    }

    // (p, ul, li, blockquote, ...)
    if (Component) {
      const props = cleanProps(element.attribs);
      return (
        <Component {...props}>
          {domToReact(element.children as DOMNode[], {
            replace: replaceOptions,
          })}
        </Component>
      );
    }
  };

  const processedNodes = blocks.map((block) => {
    if (block.type === "html") {
      return parse((block.data as HtmlEditor).body, {
        replace: replaceOptions,
      });
    }
    if (block.type === "code") {
      return <CodeRenderer key={block.id} {...(block.data as CodeEditor)} />;
    }
    if (block.type === "alert") {
      const alertData = block.data as AlertEditor;
      return (
        <Alert
          key={block.id}
          title={alertData?.title}
          variant={alertData?.type as keyof typeof alertVariants}
          className="mt-6"
        >
          {parse(alertData?.body, {
            replace: replaceOptions,
          })}
        </Alert>
      );
    }
    return null;
  });

  return { processedNodes, anchors };
}

// Helpers-------------------------------------------------------------------------------------------------
const LinkIcon = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const cleanProps = (attribs: Record<string, string>) => {
  const { class: charClass, ...rest } = attribs;
  return {
    ...rest,
    className: charClass, // Convert "class" to "className"
  };
};

// Code----------------------------------------------------------------------------------------------------
const CodeRenderer = ({ filename, code, language }: CodeEditor) => {
  const [shikiCode, setShikiCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      const highlightedCode = await highlightCodeWithShiki({
        language,
        code,
      });
      setShikiCode(highlightedCode);
      setLoading(false);
    })();
  }, [language, code]);

  return (
    <div className="mt-6 overflow-hidden flex flex-col rounded border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-900">
      <div className="relative flex items-center justify-between p-2 border-b border-stone-300 dark:border-stone-700">
        <span className="text-sm text-neutral-400 dark:text-neutral-500">
          {filename}
        </span>
        <CopyToClipBoard toCopy={code} />
      </div>
      <div className="flex items-center justify-center min-h-11">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: shikiCode }}
            className="overflow-auto max-w-full min-w-0 [&_pre_code]:max-h-100 [&_pre_code]:py-4"
          />
        )}
      </div>
    </div>
  );
};

// TODO----------------------------------------------------------------------------------------------------
const YouTubePlayerComponent = ({
  ...props
}: React.ComponentProps<"iframe">) => {
  return (
    <iframe
      title="Reprodutor de vídeo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
      className="w-full aspect-video not-first:mt-6 overflow-hidden rounded-lg not-dark:shadow-lg"
      {...props}
    />
  );
};

const ImageComponent = () => {
  {
    /* <figure className="not-first:mt-6 w-full flex flex-col">
        <Image
          src="https://placehold.co/1920x1080/000/fff/jpeg"
          alt="Placeholder image example 1"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 1020px"
          width={1920}
          height={1080}
        />
        <figcaption className="text-neutral-900 dark:text-neutral-400 text-start">
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            voluptatem, quia nisi laudantium magnam dicta dolores tempora
            cupiditate suscipit quae ipsa, doloribus eos!
          </small>
        </figcaption>
      </figure> */
  }

  return (
    <figure className="not-first:mt-6 w-full flex flex-col">
      <div className="bg-[url('https://techgage.com/wp-content/uploads/2023/03/Blender-3.5-Splash-Screen.jpg')] w-full aspect-video bg-contain rounded-lg" />
      <figcaption className="text-neutral-900 dark:text-neutral-400 text-start">
        <small>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          voluptatem, quia nisi laudantium magnam dicta dolores tempora
          cupiditate suscipit quae ipsa, doloribus eos!
        </small>
      </figcaption>
    </figure>
  );
};
