import { Main } from "../../../components/Main";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { WebGrid } from "../../../components/Display";
import { H1, H2 } from "../../../components/Typography/H";
import { P } from "../../../components/Typography/P";
import { randomInt } from "../../../utils/random";
import { cn } from "../../../utils/className";
import { faker } from "@faker-js/faker";
import { Avatar } from "../../../components/Avatar";

export default function ArticlePageId() {
  return (
    <WebGrid>
      <Header />
      <Main className="max-w-300">
        <section className="pb-4 mb-4">
          <div className="pb-4 mb-4">
            <H1>{faker.lorem.sentence(15)}</H1>
          </div>
          <div className="pb-4 mb-4">
            <p className="text-3xl font-medium text-black dark:text-neutral-400">
              {faker.lorem.sentence(15)}
            </p>
          </div>
          <div className="flex gap-6">
            <Avatar />
          </div>
        </section>
        <section className="grid grid-cols-[400px_1fr_64px] gap-6">
          <div className="sticky top-20 h-fit">
            {Array.from({ length: randomInt(7, 15) }).map((_, i) => (
              <div key={i} className="pb-2 mb-0">
                <P className={cn("text-sm", i === 0 && "dark:text-sky-500")}>
                  {faker.word.words(randomInt(3, 10))}
                </P>
              </div>
            ))}
          </div>
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
          <div className="sticky top-[calc(50%-60px)] size-16 rounded-full bg-neutral-500" />
        </section>
      </Main>
      <Footer />
    </WebGrid>
  );
}
