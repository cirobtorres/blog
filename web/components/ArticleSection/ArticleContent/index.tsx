import { faker } from "@faker-js/faker";
import { randomInt } from "../../../utils/random";

export default function ArticleContent() {
  return (
    <article className="md:px-article-content">
      {Array.from({ length: randomInt(10, 30) }).map((_, i) => {
        const a = randomInt(0, 10);
        if (a < 2)
          return (
            <div key={i} className="pb-4 mb-4">
              <h2 className="text-lg lg:text-2xl font-semibold text-foreground">
                {faker.lorem.sentence(randomInt(4, 9))}
              </h2>
            </div>
          );
        else
          return (
            <div key={i} className="pb-4 mb-4">
              <p className="text-base font-normal font-sans text-black dark:text-neutral-500">
                {faker.lorem.sentence(randomInt(30, 100))}
              </p>
            </div>
          );
      })}
    </article>
  );
}
