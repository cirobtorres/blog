import { cn } from "../../utils/className";
import { randomInt } from "../../utils/random";
import { P } from "../Typography/P";
import { faker } from "@faker-js/faker";

export default function ScrollSummary() {
  return (
    <div className="md:sticky md:top-20 h-fit">
      <div className="mb-3">
        <P className="dark:text-neutral-100">Sumário</P>
      </div>
      <div className="relative ms-3.5 before:absolute before:-left-3.5 before:inset-y-0 before:w-px before:bg-neutral-800">
        {Array.from({ length: randomInt(12, 20) }).map((_, i) => {
          const a = randomInt(2, 10);
          return (
            <div key={i} className="pb-2 mb-0">
              <P
                className={cn(
                  "text-sm",
                  i === 0 && "dark:text-sky-500",
                  a < 4 && "pl-0",
                  a < 7 && "pl-4",
                  a < 3 && "pl-8",
                )}
              >
                {faker.word.words(a)}
              </P>
            </div>
          );
        })}
        <div className="md:block hidden absolute inset-y-0 mix-blend-hard-light -right-5 w-px opacity-50 bg-[linear-gradient(to_bottom,transparent_0%,oklch(62.3%_0.214_259.815)_25%,oklch(62.7%_0.265_303.9)_50%,oklch(70.5%_0.213_47.604)_75%,transparent_100%)]" />
      </div>
    </div>
  );
}
