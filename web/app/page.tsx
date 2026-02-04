import { faker } from "@faker-js/faker";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { WebGrid } from "../components/Display";
import { Main } from "../components/Main";
import { Card } from "../components/Cards";
import { randomInt } from "../utils/random";
import { convertToLargeDate } from "../utils/date";

export default function HomePage() {
  return (
    <WebGrid>
      <Header />
      <Main className="max-w-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              key={index}
              href="/"
              title={faker.word.words(randomInt(5, 20))}
              createdAt={convertToLargeDate(faker.date.anytime())}
            />
          ))}
        </div>
      </Main>
      <Footer />
    </WebGrid>
  );
}
