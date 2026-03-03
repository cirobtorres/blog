"use client";

import Link from "next/link";
import { cn, linkVariants } from "../../../utils/className";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../Accordion";

export default function ScrollSummary() {
  return (
    <aside className="w-full h-fit md:sticky md:top-[calc(100svh/4)] ml-auto mr-0">
      <Accordion type="single" defaultValue="summary" collapsible>
        <AccordionItem value="summary">
          <AccordionTrigger className="mb-3">
            <p className="font-sans text-xs font-medium text-neutral-500 dark:text-neutral-100">
              Sumário
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="hidden overflow-y-hidden md:block md:max-h-[calc(100svh/2)] ms-3.5 relative dark:before:bg-neutral-800">
              <div className="before:absolute before:-left-3.5 before:inset-y-0 before:w-px before:bg-neutral-200">
                {Array.from({ length: 50 }).map((_, i) => (
                  <Link
                    key={i}
                    href="/"
                    data-active={i === 0}
                    className={cn(
                      linkVariants(),
                      "block text-xs text-neutral-500 ml-1 p-px my-1",
                      i === 0 &&
                        "relative text-sidebar-foreground dark:text-neutral-100 hover:bg-transparent hover:text-foreground data-[active=true]:bg-transparent data-[depth=3]:ps-4.5 data-[depth=4]:ps-5.5 data-[active=true]:text-foreground before:absolute data-[active=true]:before:w-0.75 data-[active=true]:before:bg-primary before:inset-y-px before:-left-4.75 before:w-px before:rounded-full",
                    )}
                  >
                    Lorem ipsum dolor
                  </Link>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
