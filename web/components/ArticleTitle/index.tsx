import { Avatar } from "../Avatar";
// import { Link } from "../Links";
import { ArtBreadcrumb } from "./Breadcrumb";

export default function ArticleTitle() {
  return (
    <div className="relative w-full max-w-article-title mx-auto px-6">
      <section className="col-start-2">
        {/* <Link href="/" className="inline-flex gap-2 items-center mb-5 group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 448 512"
            height="16px"
            width="16px"
            className="-rotate-90 group-hover:animate-bouncing-arrow group-focus-visible:animate-bouncing-arrow"
          >
            <path d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" />
          </svg>
          <p>HOME</p>
        </Link> */}
        <ArtBreadcrumb />
        <Title />
        <Subtitle />
        <div className="flex items-center gap-6">
          <Avatar />
          <small className="flex flex-col font-medium text-neutral-400 dark:text-neutral-500 md:flex-row md:gap-6">
            <time>2 de fevereiro de 2026, às 10:53</time>
            <time>17 de fevereiro de 2026, às 19:22</time>
          </small>
        </div>
      </section>
      <div className="w-full h-px inline-grid my-8">
        <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)]" />
        <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)] blur-sm" />
      </div>
    </div>
  );
}

const Title = () => (
  <div className="pb-4 mb-4">
    <h1 className="text-3xl lg:text-5xl font-semibold text-foreground">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ipsum
      illum assumenda
    </h1>
  </div>
);

const Subtitle = () => (
  <div className="pb-4 mb-4">
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ipsum
      illum assumenda
    </p>
  </div>
);
