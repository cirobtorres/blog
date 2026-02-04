import { faker } from "@faker-js/faker";
import { randomInt } from "../../utils/random";
import { H2 } from "../Typography/H";
import { P } from "../Typography/P";

export default function ArticleContent() {
  return (
    <div>
      {Array.from({ length: randomInt(10, 30) }).map((_, i) => {
        const a = randomInt(0, 10);
        if (a < 2)
          return (
            <div key={i} className="pb-4 mb-4">
              <H2>{faker.lorem.sentence(randomInt(4, 9))}</H2>
            </div>
          );
        else
          return (
            <div key={i} className="pb-4 mb-4">
              <P>{faker.lorem.sentence(randomInt(30, 100))}</P>
            </div>
          );
      })}
    </div>
  );
}
