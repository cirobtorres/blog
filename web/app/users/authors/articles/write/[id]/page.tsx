import ArticleUpdate from "../../../../../../components/Users/Authors/Article/ArticleUpdate";
import { apiServerUrls } from "../../../../../../routing/routes";
import { serverFetch } from "../../../../../../services/serverFetch";

export default async function AuthorsArticlesEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await serverFetch(apiServerUrls.article.id + "/" + id);
  const articles = await response.json();
  return <ArticleUpdate {...articles} />;
}
