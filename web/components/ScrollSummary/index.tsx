import { cn } from "../../utils/className";
import { randomInt } from "../../utils/random";
import { P } from "../Typography/P";
import { faker } from "@faker-js/faker";

export default function ScrollSummary() {
  return (
    <div className="md:sticky md:top-20 h-fit">
      {Array.from({ length: randomInt(7, 15) }).map((_, i) => {
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
    </div>
  );
}
