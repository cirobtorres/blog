"use server";

import ArticleCard from "../components/ArticleCard";

export default async function HomePage() {
  return (
    <>
      <div className="bg-base-placeholder">
        <div className="w-full max-w-webpage mx-auto gap-8 h-[calc(384px_+_64px_+_64px)] p-16"></div>
      </div>
      <div className="max-w-webpage mx-auto">
        <div className="grid grid-cols-3 gap-8 m-16">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>
    </>
  );
}
