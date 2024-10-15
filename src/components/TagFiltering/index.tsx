"use client";

import { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import TagListItem from "../TagListItem";
import Loading from "../Loading";

const FilteredTags = ({
  tags,
  filter,
}: {
  tags: any[] | null;
  filter?: string;
}) => {
  function filtering(tags: any[], regexfilter: string) {
    const regex = new RegExp(
      `^${regexfilter}(?:\\s-\\s.+)?$|\\b${regexfilter}\\w*`,
      "i"
    );
    return tags.filter((tag) => regex.test(tag.title));
  }

  if (tags) {
    if (filter && filter !== "") {
      return (
        <Suspense fallback={<Loading />}>
          {filtering(tags, filter).map((tag) => (
            <TagListItem key={tag.id} {...tag} />
          ))}
        </Suspense>
      );
    }
    return tags.map((tag) => <TagListItem key={tag.id} {...tag} />);
  }
};

export default function TagFiltering({ tags }: { tags: any[] | null }) {
  const [searchValue, setSearchValue] = useState("");
  const searchId = "tags-search";
  return (
    <>
      <div className="my-4">
        <div className="relative w-full max-w-md h-8 rounded overflow-hidden transition-[outline] duration-200 outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 border border-base-border dark:border-dark-base-border">
          <input
            id={searchId}
            type="text"
            placeholder=""
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full h-full pr-7 pt-1 pl-1.5 pb-1.5 flex items-center text-xs placeholder:text-xs placeholder:text-dark-base-placeholder text-base-neutral dark:text-dark-base-neutral border-none outline-none bg-transparent"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={(event) => {
              event?.preventDefault();
              setSearchValue("");
              document.getElementById(searchId)?.focus();
            }}
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:text-base-red dark:hover:text-dark-base-red text-sm text-base-neutral dark:text-dark-base-neutral"
          >
            <IoClose />
          </button>
        </div>
      </div>
      {tags && (
        <ul className="flex-wrap flex items-center">
          <FilteredTags tags={tags} filter={searchValue} />
        </ul>
      )}
    </>
  );
}
