"use server";

import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatDate } from "@/functions/formatDate";

export default async function ArticleCard({
  id,
  slug,
  title,
  sub_title,
  body,
  updated_at,
}: {
  id: string;
  slug: string;
  title: string;
  sub_title: string;
  body: string;
  updated_at: string;
}) {
  return (
    <Link href={`/artigos/${slug}/${id}`} className="outline-none group">
      <article className="flex flex-col p-4 rounded-2xl overflow-hidden hover:shadow-md hover:bg-base-150 dark:hover:dark:bg-[#2a2e35]">
        <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
          Última atualização: {formatDate(updated_at)}
        </time>
        <h2 className="line-clamp-2 text-base font-extrabold text-base-green dark:text-dark-base-green mb-1">
          {title}
        </h2>
        <h3 className="line-clamp-2 text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-1">
          {sub_title}
        </h3>
        <span className="flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue mt-1">
          Saiba mais
          <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
      </article>
    </Link>
  );
}
