"use client";

import { formatDate } from "@/functions/formatDate";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function DashboardSummaryCard({
  summary,
  onClick,
}: {
  summary: any | null;
  onClick: (value: string) => void;
}) {
  return (
    <li
      onClick={() => onClick(summary)}
      className="h-full overflow-hidden transition-all duration-200 rounded-2xl border border-base-border dark:border-dark-base-border bg-base-100 dark:bg-dark-base-100 hover:bg-base-150 dark:hover:dark:bg-dark-base-150 outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 cursor-pointer group"
    >
      <article className="relative h-full flex flex-col p-4">
        <span className="uppercase font-extrabold text-6xl flex justify-center items-center absolute -rotate-12 top-1/2 -translate-y-1/2 h-8 left-0 right-0 text-slate-500/15">
          Rascunho
        </span>
        <h2 className="line-clamp-2 text-base font-extrabold text-base-green dark:text-dark-base-green mb-2">
          {summary.title}
        </h2>
        <h3 className="line-clamp-2 text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-2">
          {summary.sub_title}
        </h3>
        <div className="flex flex-col mb-2">
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Atualizado: {formatDate(summary.updated_at)}
          </time>
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Criado: {formatDate(summary.created_at)}
          </time>
        </div>
        <span className="mt-auto mb-0 flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue">
          Saiba mais
          <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
      </article>
    </li>
  );
}
