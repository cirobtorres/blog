import Tags from "../Tags";

const ArticleBody = ({ body }: { body: string }) => {
  const returnBodyWithAnchorHeading = (content: string) => {
    let index = 0; // Inicia o índice em 0

    // Função de substituição usando uma expressão regular
    return content.replace(/<h3 class/g, (match) => {
      const replacement = `<h3 id="anchor-${index}" class`;
      index++; // Incrementa o índice
      return replacement;
    });
  };

  return (
    <div id="main-article" className="w-full min-w-[300px]">
      <section
        dangerouslySetInnerHTML={{ __html: returnBodyWithAnchorHeading(body) }}
        className="[&_h3]:text-xl [&_h3]:pt-4 tablet:[&_h3:first-child]:pt-20"
      />
      <Tags />
    </div>
  );
};

export default ArticleBody;
