import { faker } from "@faker-js/faker";
import { A } from "../Links";
import { P } from "../Typography/P";
import { linkVariants } from "../../utils/className";

export function Card({
  title,
  href,
  createdAt,
  ...props
}: React.ComponentProps<"article"> & {
  title: string;
  href: string;
  createdAt: string;
}) {
  return (
    <article
      {...props}
      className="max-w-100 min-h-90 mx-auto flex flex-col justify-between rounded-lg p-1 border border-neutral-200 dark:border-neutral-800"
    >
      <div className="flex flex-col p-4 gap-2">
        <P className="text-neutral-500">{createdAt}</P>
        <A href={href} className={linkVariants({ variant: "title" })}>
          {title}
        </A>
        <P className="text-neutral-500">{faker.word.words(30)}</P>
      </div>
      <A
        href={href}
        className={linkVariants({
          variant: "button",
        })}
      >
        Saiba mais
      </A>
    </article>
  );
}
