"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Hr } from "../../../../components/utils";
import MediaFolderCards, {
  MediaFolderCardsLoading,
} from "../../../../components/Authors/Media/Folders/MediaFolderCards";
import MediaFileCards, {
  MediaFileCardsLoading,
} from "../../../../components/Authors/Media/Files/Cards/MediaFileCards";

export default async function AuthorsMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; folder?: string }>;
}) {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token");
  const resolvedParams = await searchParams;
  return (
    <>
      <Suspense fallback={<MediaFolderCardsLoading />}>
        <MediaFolderCards accessToken={accessToken?.value} />
      </Suspense>
      <Hr className="my-6" />
      <Suspense fallback={<MediaFileCardsLoading />}>
        <MediaFileCards
          accessToken={accessToken?.value}
          searchParams={resolvedParams}
        />
      </Suspense>
    </>
  );
}
