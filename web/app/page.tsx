import { faker } from "@faker-js/faker";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Grid } from "../components/Display";
import { Main } from "../components/Main";
import { Card } from "../components/Cards";
import { RandomInt } from "../utils/random";
import { convertToLargeDate } from "../utils/date";

export default function HomePage() {
  return (
    <Grid>
      <Header />
      <Main className="max-w-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              key={index}
              href="/"
              title={faker.word.words(RandomInt(5, 20))}
              createdAt={convertToLargeDate(faker.date.anytime())}
            />
          ))}
        </div>
      </Main>
      <Footer />
    </Grid>
  );
}
