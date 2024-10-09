"use client";

import { MdKeyboardArrowRight } from "react-icons/md";
import formatDate from "@/functions/formatDate";

const DashboardArticleCard = ({
  article,
  onClick,
}: {
  article: any;
  onClick: (value: any) => void;
}) => {
  return (
    <li
      onClick={() => onClick(article)}
      className="cursor-pointer w-full h-full overflow-hidden transition-all duration-200 rounded-2xl border border-base-border dark:border-dark-base-border bg-base-100 dark:bg-dark-base-100 hover:bg-base-150 dark:hover:dark:bg-dark-base-150 outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 group"
    >
      <article className="relative w-full h-full flex flex-col p-4">
        {(article.private || article.blocked_for_replies) && (
          <div className="flex gap-1 items-center absolute right-4 top-4">
            {article.private && <RoundNotification color="#ef4444" />}
            {article.blocked_for_replies && (
              <RoundNotification color="#eab308" />
            )}
          </div>
        )}
        <h2 className="line-clamp-2 text-base font-extrabold text-base-green dark:text-dark-base-green mb-2">
          {article.title}
        </h2>
        <h3 className="line-clamp-2 text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-2">
          {article.sub_title}
        </h3>
        <div className="flex flex-col mb-2">
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Atualizado: {formatDate(article.updated_at)}
          </time>
          <time className="text-xs text-base-neutral dark:text-dark-base-neutral">
            Criado: {formatDate(article.created_at)}
          </time>
        </div>
        <span className="mt-auto mb-0 flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue">
          Saiba mais
          <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
        </span>
      </article>
    </li>
  );
};

const RoundNotification = ({ color }: { color: string }) => {
  return <span className="size-2 rounded-full" style={{ background: color }} />;
};

export default DashboardArticleCard;
