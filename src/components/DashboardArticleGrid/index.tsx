"use client";

import { useState } from "react";
import DashboardArticleCard from "../DashboardArticleCard";
import ArticleSideBar from "../ArticleSideBar";

export default function DashboardArticleGrid({
  articles,
  tags,
}: {
  articles: any[] | null;
  tags: any[] | null;
}) {
  const [article, setArticle] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (value: any) => {
    setIsOpen(!isOpen);
    setArticle(value);
  };

  return (
    articles && (
      <>
        <ul className="grid grid-cols-3 max-[1100px]:grid-cols-2 max-[750px]:grid-cols-1 gap-3">
          {articles.map((article) => (
            <DashboardArticleCard
              key={article.id}
              article={article}
              onClick={handleClick}
            />
          ))}
        </ul>
        <ArticleSideBar
          article={article}
          tags={tags}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </>
    )
  );
}
