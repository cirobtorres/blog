"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Accordion";
import { cn } from "../../../../utils/variants";
import React from "react";

export default function ScrollSummary({
  anchors,
}: {
  anchors: { id: string; text: string }[];
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
    <aside className="w-full h-fit md:sticky md:top-[25svh] ml-auto mr-0">
      <Accordion type="single" defaultValue="summary" collapsible>
        <AccordionItem value="summary">
          <AccordionTrigger className="mb-3">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-100">
              Sumário
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="hidden overflow-y-hidden md:block md:max-h-[50svh] ms-3.5 relative dark:before:bg-neutral-800">
              <nav
                ref={anchorListRef}
                className="before:absolute before:-left-3.5 before:inset-y-0 before:w-px before:bg-neutral-200"
              >
                {anchors.map((anchor, i) => (
                  <Link
                    key={anchor.id}
                    href={"#" + anchor.id}
                    aria-current={i === 0 ? "true" : "false"}
                    aria-label={`Navegar até a sessão "${anchor.text}"`}
                    className={cn(
                      "block text-xs ml-1 p-px my-1 transition-colors duration-300 no-underline!",
                    )}
                  >
                    {anchor.text}
                  </Link>
                ))}
              </nav>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

// aria-current
// relative dark:text-neutral-100 hover:bg-transparent hover:text-neutral-100 data-[active=true]:bg-transparent data-[depth=3]:ps-4.5 data-[depth=4]:ps-5.5 data-[active=true]:text-neutral-100 before:absolute data-[active=true]:before:w-0.75 data-[active=true]:before:bg-primary before:inset-y-px before:-left-4.75 before:w-px before:rounded-full
