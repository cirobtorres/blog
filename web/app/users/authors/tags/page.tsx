"use server";

import { Suspense } from "react";
import { Skeleton } from "../../../../components/Skeleton";
import { serverFetch } from "../../../../services/auth-fetch-actions";
import { apiServerUrls } from "../../../../routing/routes";
import { Hr } from "../../../../components/utils";
import TagCreate from "../../../../components/Authors/Tags/TagCreate";
import TagFilter from "../../../../components/Authors/Tags/TagFilter";

const TAG_REVALIDATE_TIME = 60 * 60 * 24 * 7; // 1 week

export default async function TagsPage() {
  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 p-2">
      <h1 className="text-3xl font-extrabold my-6">Gerenciar Tags</h1>
      <Suspense fallback={<LoadingTagState />}>
        <LoadTags />
      </Suspense>
    </section>
  );
}

const LoadTags = async () => {
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["tags"], revalidate: TAG_REVALIDATE_TIME },
    cache: "force-cache",
  };
  const response = await serverFetch(apiServerUrls.tags.root, options);
  if (!response.ok)
    return (
      <section>
        <h1 className="text-xl flex items-center">
          <b>erro {response.status}</b>
        </h1>
      </section>
    );
  const data: PageableTag = await response.json();
  const { content: tags, page } = data;
  const count = page.totalElements;

  return (
    <>
      <TagCreate tags={tags} />
      <Hr className="my-6" />
      <h2 className="text-xl flex items-center">
        Tag{count > 1 && "s"}: {count}
      </h2>
      <TagFilter tags={tags} />
    </>
  );
};

const LoadingTagState = () => (
  <>
    <Skeleton className="w-md h-27" />
    <Hr className="my-6" />
    <h2 className="text-xl flex items-center">
      Tag: <Skeleton className="size-7" />
    </h2>
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-9 rounded-lg" />
      ))}
    </div>
  </>
);
