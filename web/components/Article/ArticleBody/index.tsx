"use client";

import React from "react";
import NextLink from "next/link";
import parse, { DOMNode, domToReact, Element } from "html-react-parser";
import * as Typography from "../../Typography";
import { slugify } from "../../../utils/strings-transforms";
import { alertVariants, cn, focusRing } from "../../../utils/variants";
import { Alert } from "../../Alert";
import BackToTopButton from "./BackToTopButton";
import ScrollSummary from "./ScrollSummary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Accordion";
import BlockImages, { ImageComponent } from "../../Blocks/HTML/BlockImages";
import CodeRenderer from "../../Blocks/HTML/CodeRenderer";

const typographyMap: Record<string, React.ElementType> = {
  h2: Typography.H2,
  h3: Typography.H3,
  h4: Typography.H4,
  p: Typography.P,
  b: Typography.B,
  strong: Typography.Strong,
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
    <div className="w-full max-w-article-body mx-auto px-3 my-8">
      <section className="relative grid grid-cols-1 lg:grid-cols-[300px_auto_1fr] gap-4">
        <ScrollSummary anchors={anchors} />
        <article className="w-full max-w-article-title overflow-hidden">
          {processedNodes.map((node, index) => (
            <React.Fragment key={index}>{node}</React.Fragment>
          ))}
        </article>
        <div className="sticky size-fit max-w-75 hidden lg:block top-[calc(50%-var(--height-header))] ml-0 mr-auto">
          <BackToTopButton />
        </div>
      </section>
    </div>
  );
}

export function processBlocks(blocks: Blocks[]) {
  const anchors: { id: string; text: string; padding: number }[] = [];

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

      const padding = Number(tagName.slice(1));
      const id = slugify(text);
      anchors.push({ id, text, padding });

      const Component = typographyMap[tagName];
      const children = domToReact(element.children as DOMNode[]);

      return (
        <Component id={id}>
          <NextLink
            href={`#${id}`}
            className={cn(
              "w-fit flex items-center gap-2 rounded border border-transparent transition-shadow duration-300 group",
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
          className="not-first:mt-6"
        >
          {parse(alertData?.body, {
            replace: replaceOptions,
          })}
        </Alert>
      );
    }

    if (block.type === "image") {
      const imageData = block.data as ImageEditor;
      return (
        <div key={block.type + "-" + imageData.id} className="not-first:mt-6">
          <ImageComponent {...imageData} />
        </div>
      );
    }

    if (block.type === "images") {
      const imagesData = block.data as ImagesEditor;
      return (
        <BlockImages
          key={block.id}
          blockType={block.type}
          images={imagesData.images}
        />
      );
    }

    if (block.type === "accordion") {
      const accordionData = block.data as AccordionEditor;
      return (
        <Accordion
          key={block.id}
          type="multiple"
          className="not-first:mt-6 px-4 border rounded-lg bg-stone-200 dark:bg-stone-900"
        >
          {accordionData.accordions.map((accordion) => {
            return (
              <AccordionItem
                key={accordion.id}
                value={accordion.id}
                className="not-last:border-b hover:"
              >
                <AccordionTrigger className="text-base px-0">
                  {accordion.title}
                </AccordionTrigger>
                <AccordionContent>
                  {parse(accordion?.body, {
                    replace: replaceOptions,
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
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
