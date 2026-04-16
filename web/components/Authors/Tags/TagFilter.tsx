"use client";

import { useTags } from "../../../services/hooks/tags/hook-tags";
import { Skeleton } from "../../Skeleton";
import TagDelete from "./TagDelete";

export default function TagFilter() {
  const { data } = useTags();
  if (data?.content) {
    const { content: tags, page } = data as PageableTag;
    const count = page.totalElements;
    return (
      <>
        <h2 className="text-xl flex items-center">
          Tag{count > 1 && "s"}: {count}
        </h2>
        {tags?.length > 0 && (
          <ul className="grid grid-cols-3 gap-2">
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="text-sm break-all flex justify-between items-center p-1 pl-2 border rounded-lg bg-stone-200 dark:bg-stone-900"
              >
                <span className="w-full truncate italic text-neutral-600 dark:text-neutral-500">
                  {tag.name}
                </span>
                <TagDelete tag={tag} />
              </li>
            ))}
          </ul>
        )}
        {tags?.length === 0 && (
          <span className="text-neutral-700">Nenhuma tag...</span>
        )}
      </>
    );
  }
  return <LoadingTags />;
}

const LoadingTags = () => (
  <>
    <h2 className="text-xl flex items-center">
      Tags: <Skeleton className="size-7" />
    </h2>
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-9 rounded-lg" />
      ))}
    </div>
  </>
);
