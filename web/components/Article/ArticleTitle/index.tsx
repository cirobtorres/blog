import Image from "next/image";
import { Avatar } from "../../Avatar";
import { ArtBreadcrumb } from "./Breadcrumb";
import { convertToLargeDate } from "../../../utils/date";
import Link from "next/link";
import LikeButton from "./LikeButton";

export default function ArticleTitle({
  id: articleId,
  title,
  subtitle,
  author: { name: authorName, pictureUrl: authorPicUrl },
  media: { bannerUrl: artBannerUrl, alt: artBannerAlt },
  likeCount,
  commentCount,
  createdAt,
  updatedAt,
}: Article) {
  return (
    <div className="w-full inline-grid">
      <Image
        src={artBannerUrl}
        alt={artBannerAlt}
        width={1920}
        height={1080}
        className="lg:col-start-1 lg:row-start-1 lg:h-150 lg:object-cover w-full border-b dark:border-stone-800"
      />
      <div className="bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1))] lg:col-start-1 lg:row-start-1 lg:h-180 w-full border-b dark:border-stone-800 aspect-video bg-cover" />
      <div className="lg:col-start-1 lg:row-start-1 lg:px-10 lg:mt-auto lg:mb-0 lg:pt-10 border-t lg:backdrop-blur-xl lg:bg-linear-to-t dark:lg:from-25% not-dark:lg:from-stone-100 not-dark:lg:via-white/75 not-dark:lg:to-white/50 dark:lg:from-stone-925 dark:lg:to-stone-925/25">
        <div className="w-full max-w-article-title p-6 pb-0 lg:mx-auto lg:px-10">
          <section className="col-start-2">
            <ArtBreadcrumb />
            <Title id={articleId} title={title} />
          </section>
        </div>
      </div>
      <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10">
        <Subtitle subtitle={subtitle} />
      </div>
      <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10 mb-6">
        <div className="flex items-center gap-8">
          <span className="text-sm flex items-center gap-2">
            <LikeButton />
            {likeCount}
          </span>
          <span className="text-sm flex items-center gap-2">
            <Link href="#comments" className="cursor-pointer flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
              </svg>
            </Link>
            {commentCount}
          </span>
          <div className="flex flex-col lg:hidden">
            <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
              Criado: <time>2-02-2026</time>
            </small>
            <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
              Atualizado: <time>17-02-2026</time>
            </small>
          </div>
          <div className="hidden lg:flex gap-3">
            <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
              Criado: <time>{convertToLargeDate(new Date(createdAt))}</time>
            </small>
            {updatedAt && (
              <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
                Atualizado:{" "}
                <time>{convertToLargeDate(new Date(updatedAt))}</time>
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-stone-200 dark:bg-stone-900 border-y py-2">
        <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10">
          <div className="flex items-center gap-3 lg:gap-6">
            <Avatar {...{ authorName, authorPicUrl }} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10 mt-6">
        <div className="w-full h-px inline-grid">
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)]" />
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)] blur-sm" />
        </div>
      </div>
    </div>
  );
}

const Title = ({ id, title }: { id: string; title: string }) => (
  <div className="pb-1 lg:pb-4 mb-1 lg:mb-4">
    <h1
      id={id}
      className="text-3xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-100"
    >
      {title}
    </h1>
  </div>
);

const Subtitle = ({ subtitle }: { subtitle: string }) => (
  <div className="pb-1 lg:pb-4 mb-1 lg:mb-4">
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-400">
      {subtitle}
    </p>
  </div>
);
