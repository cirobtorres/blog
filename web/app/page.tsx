import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { WebGrid } from "../components/Display";
import { Card } from "../components/Cards";
import { randomInt } from "../utils/random";
import { convertToLargeDate } from "../utils/date";
import { faker } from "@faker-js/faker";

export default function HomePage() {
  return (
    <WebGrid>
      <Header />
      <main className="mt-header-height">
        <div className="w-full max-w-full h-120 bg-[url('https://placehold.co/1920x480/0a0a0a/f5f5f5/jpg')]" />
        <div className="p-6">
          <div className="w-full max-w-360 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card
                  key={index}
                  href={
                    "/article/" +
                    faker.word.words(randomInt(5, 12)).split(" ").join("-")
                  }
                  title={faker.word.words(randomInt(5, 20))}
                  createdAt={convertToLargeDate(faker.date.anytime())}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </WebGrid>
  );
}
