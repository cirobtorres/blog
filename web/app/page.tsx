import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { WebGrid } from "../components/Display";
import {
  CardBody,
  CardFooter,
  CardGrid,
  CardHeader,
  CardImage,
  CardImageWrapper,
  CardWrapper,
} from "../components/Cards";
import { randomInt } from "../utils/random";
import { convertToLargeDate } from "../utils/date";
import { faker } from "@faker-js/faker";
import { Banner } from "../components/Banner";
import Link from "next/link";
import { linkVariants } from "../utils/className";

const cardItems = Array.from({ length: 5 }).map(() => {
  const src = randomInt(8, 19) * 100;
  const title = faker.word.words(randomInt(5, 12));
  const href = title.split(" ").join("-");
  return {
    // src: "https://picsum.photos/" + src + "?grayscale",
    src: "https://picsum.photos/" + src,
    href,
    title,
    createdAt: convertToLargeDate(faker.date.anytime()),
  };
});

export default function HomePage() {
  return (
    <WebGrid>
      <Header />
      <main>
        <Banner h="2xl" />
        <div className="p-6">
          <div className="w-full max-w-360 mx-auto">
            <CardGrid>
              {cardItems.map((props, index) => (
                <CardWrapper key={index}>
                  <CardHeader className="p-0">
                    <CardImageWrapper h="md" className="rounded-t-lg">
                      <CardImage
                        // src="https://placehold.co/1920x480/000000/737373/jpg"
                        src={props.src}
                        alt="Lorem ipsum dolor sit amet consectetur."
                      />
                    </CardImageWrapper>
                  </CardHeader>
                  <CardBody>
                    <p className="text-base font-normal font-sans text-black dark:text-neutral-500">
                      {props.createdAt}
                    </p>
                    <Link
                      href={"/articles/" + props.href}
                      className={linkVariants({ variant: "title" })}
                    >
                      {props.title}
                    </Link>
                    <p className="text-base font-normal font-sans text-black dark:text-neutral-500">
                      {faker.word.words(30)}
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Link
                      href={"/articles/" + props.href}
                      className={linkVariants({
                        variant: "button",
                      })}
                    >
                      Saiba mais
                    </Link>
                  </CardFooter>
                </CardWrapper>
              ))}
            </CardGrid>
          </div>
        </div>
      </main>
      <Footer />
    </WebGrid>
  );
}
