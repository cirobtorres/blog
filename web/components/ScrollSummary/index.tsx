import { cn, linkVariants } from "../../utils/className";
import { P } from "../Typography/P";
import { randomInt } from "../../utils/random";
import { faker } from "@faker-js/faker";
import { A } from "../Typography/A";

export default function ScrollSummary() {
  return (
    <div className="md:sticky md:top-20 h-fit ml-auto mr-0">
      <div className="mb-3">
        <P className="text-neutral-500 dark:text-neutral-100">Sumário</P>
      </div>
      <div className="relative ms-3.5 before:absolute before:-left-3.5 before:inset-y-0 before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
        {Array.from({ length: randomInt(12, 20) }).map((_, i) => {
          const a = randomInt(2, 10);
          return (
            <div key={i} className="pb-2 mb-0">
              <A
                href="/"
                className={cn(
                  linkVariants({ variant: "internal" }),
                  "text-sm font-normal text-neutral-400",
                  i === 0 && "text-black dark:text-neutral-100",
                  a < 4 && "pl-0",
                  a < 7 && "pl-4",
                  a < 3 && "pl-8",
                )}
              >
                {faker.word.words(a)}
              </A>
            </div>
          );
        })}
        <div className="md:block hidden absolute inset-y-0 mix-blend-hard-light -right-[calc(var(--padding-article-content)/2)] w-px opacity-50 bg-gradient-linear" />
      </div>
    </div>
  );
}
