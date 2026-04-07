"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import FolderCardsLoading from "../../../../components/Authors/Media/Folders/Cards/FolderCardsLoading";
import FolderCards from "../../../../components/Authors/Media/Folders/Cards/FolderCards";
import MediaFileCardsLoading from "../../../../components/Authors/Media/Files/Cards/MediaFileCardsLoading";
import MediaFileCards from "../../../../components/Authors/Media/Files/Cards/MediaFileCards";
import ArticleEditorSlug from "../../../../components/Editors/editors/ArticleEditorSlug";
import ArticleEditorCategory from "../../../../components/Editors/editors/ArticleEditorCategory";
import { ArticleEditorTitle } from "../../../../components/Editors/editors/ArticleEditorTitle";
import { ArticleEditorSubtitle } from "../../../../components/Editors/editors/ArticleEditorSubtitle";
import { Button } from "../../../../components/Button";
import { Hr } from "../../../../components/utils";
import ArticleBlockButtons from "../../../../components/Editors/ArticleBlockButtons";
import ArticleEditorBanner from "../../../../components/Editors/editors/ArticleEditorBanner";

export default async function AuthorsArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; size?: string; folder?: string }>;
}) {
  const cookie = cookies();
  const accessToken = (await cookie).get("access_token");
  const resolvedParams = await searchParams;

  return (
    <form>
      <ArticleEditorsWrapper>
        <div className="flex justify-between items-center my-6">
          <ArticleTitle>Escrever novo artigo</ArticleTitle>
          <ArticleButtons />
        </div>
        <div className="w-full flex flex-col gap-2">
          <ArticleEditorTitle />
          <ArticleEditorSubtitle />
          <div className="grid grid-cols-2 gap-2">
            <ArticleEditorSlug />
            <ArticleEditorCategory />
          </div>
          <ArticleEditorBanner>
            <Suspense fallback={<FolderCardsLoading />}>
              <FolderCards accessToken={accessToken?.value} />
            </Suspense>
            <Hr className="my-6" />
            <Suspense fallback={<MediaFileCardsLoading />}>
              <MediaFileCards
                accessToken={accessToken?.value}
                searchParams={resolvedParams}
              />
            </Suspense>
          </ArticleEditorBanner>
        </div>
        <div className="mt-2">
          <ArticleBlockButtons />
        </div>
      </ArticleEditorsWrapper>
    </form>
  );
}

const ArticleEditorsWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
    {children}
  </section>
);

const ArticleTitle = ({ children }: { children: string }) => (
  <h1 className="w-full text-3xl font-extrabold">{children}</h1>
);

const ArticleButtons = () => (
  <div className="w-full flex justify-end items-center gap-2">
    <Button variant="outline" className="w-full max-w-30 h-8">
      Salvar
    </Button>
    <Button className="w-full max-w-30 h-8">Publicar</Button>
    <Button variant="outline" className="size-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </Button>
  </div>
);
