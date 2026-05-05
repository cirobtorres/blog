"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Accordion";
import { cn, focusRing } from "../../../../utils/variants";
import React from "react";

export default function ScrollSummary({
  anchors,
}: {
  anchors: { id: string; text: string; padding: number }[];
}) {
  const anchorListRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (anchors.length === 0) return;

    const linkAnchorsListener = () => {
      const header = document.getElementById("main-header");
      const headerHeight = header?.offsetHeight ?? 0;

      let currentSectionIndex = 0;

      anchors.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (!section) return;

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY - headerHeight;

        if (window.scrollY >= sectionTop) {
          currentSectionIndex = index;
        }
      });

      const links = anchorListRef.current?.querySelectorAll("a");
      links?.forEach((link, index) => {
        link.setAttribute(
          "aria-current",
          index === currentSectionIndex ? "true" : "false",
        );
      });
    };

    window.addEventListener("scroll", linkAnchorsListener);
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, [anchors]);

  return (
    <aside className="w-full h-fit lg:sticky lg:top-16 ml-auto border rounded-lg bg-stone-200 dark:bg-stone-900">
      <Accordion type="single" defaultValue="summary" collapsible>
        <AccordionItem value="summary">
          <AccordionTrigger className="mx-1.5 my-1.5 hover:bg-stone-250 dark:hover:bg-stone-800">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-100">
              Sumário
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-y-hidden lg:max-h-[50svh] pr-1">
              <nav ref={anchorListRef}>
                {anchors.map((anchor, i) => {
                  const { padding } = anchor;
                  return (
                    <Link
                      key={anchor.id}
                      href={"#" + anchor.id}
                      aria-current={i === 0 ? "true" : "false"}
                      aria-label={`Navegar até a sessão "${anchor.text}"`}
                      className={cn(
                        "block text-xs ml-1 py-px px-1 my-1 font-medium border border-transparent rounded transition-all duration-300 no-underline! hover:bg-stone-250 dark:hover:bg-stone-800",
                        focusRing,
                      )}
                      style={{ paddingLeft: padding * 8 + "px" }}
                    >
                      <AccordionItem value={anchor.text}>
                        {anchor.text}
                      </AccordionItem>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
