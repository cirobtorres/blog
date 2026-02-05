import { H1 } from "../Typography/H";
import { Avatar } from "../Avatar";
import { convertToLargeDate } from "../../utils/date";
import { faker } from "@faker-js/faker";
import ArticleBreadcrumb from "../ArticleBreadcrumb";

export default function ArticleTitle() {
  return (
    <div className="w-full max-w-article-title mx-auto">
      <section className="pb-4 mb-4">
        <ArticleBreadcrumb />
        <Title />
        <Subtitle />
        <div className="flex items-center gap-6">
          <Avatar />
          <small className="flex flex-col font-medium text-neutral-400 dark:text-neutral-500 md:flex-row md:gap-6">
            <time>{convertToLargeDate(new Date())}</time>
            <time>{convertToLargeDate(new Date())}</time>
          </small>
        </div>
      </section>
    </div>
  );
}

const Title = () => (
  <div className="pb-4 mb-4">
    <H1>{faker.lorem.sentence(15)}</H1>
  </div>
);

const Subtitle = () => (
  <div className="pb-4 mb-4">
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-400">
      {faker.lorem.sentence(15)}
    </p>
  </div>
);
