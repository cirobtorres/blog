"use server";

import { getArticle } from "../../../../lib/articles";
import { DynamicBody } from "../../../../components/Body";
import Hero from "../../../../components/Hero";
import Article from "../../../../components/Article";
import Categories from "../../../../components/Categories";
import RelatedArticles from "../../../../components/RelatedArticles";
import CommentSection from "@/components/CommentSection";
import { getUserMeLoader } from "@/service/user-me-loader";

interface Params {
  params: {
    documentId: string;
    slug: string;
  };
}

export default async function ArticlesPage({ params }: Params) {
  const { documentId } = await params;
  const { data: article } = await getArticle(documentId);
  const user = await getUserMeLoader();

  if (article) {
    return (
      <DynamicBody documentId={documentId}>
        <Hero article={article} />
        <Article documentId={documentId} content={article.blocks} />
        {article.category && (
          <Categories
            category={article.category}
            subCategories={article.subCategories}
            tags={article.tags}
          />
        )}
        <RelatedArticles />
        <CommentSection
          articleDocumentId={article.documentId}
          loggedUser={user}
        />
      </DynamicBody>
    );
  }
}
