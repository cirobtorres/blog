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
    <div id="main-article" className="w-full">
      <section
        dangerouslySetInnerHTML={{ __html: returnBodyWithAnchorHeading(body) }}
        className="[&_h3]:text-xl [&_h3]:pt-20"
      />
    </div>
  );
};

export default ArticleBody;
