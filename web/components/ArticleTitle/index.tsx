import { faker } from "@faker-js/faker";
import { H1 } from "../Typography/H";
import { Avatar } from "../Avatar";
import { convertToLargeDate } from "../../utils/date";

export default function ArticleTitle() {
  return (
    <div className="w-full max-w-300 mx-auto">
      <section className="pb-4 mb-4">
        <div className="pb-4 mb-4">
          <H1>{faker.lorem.sentence(15)}</H1>
        </div>
        <div className="pb-4 mb-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium text-black dark:text-neutral-400">
            {faker.lorem.sentence(15)}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Avatar />
          <small className="flex flex-col md:flex-row md:gap-6">
            <time>{convertToLargeDate(new Date())}</time>
            <time>{convertToLargeDate(new Date())}</time>
          </small>
        </div>
      </section>
    </div>
  );
}
