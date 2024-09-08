import Tags from "../Tags";

const ArticleBody = ({ body }: { body: string }) => {
  const returnBodyWithAnchorHeading = (content: string) => {
    let index = 0; // Inicia o índice em 0

    // Função de substituição usando uma expressão regular
    return content.replace(/<h3/g, (match) => {
      const replacement = `<h3 id="anchor-${index}"`;
      index++; // Incrementa o índice
      return replacement;
    });
  };

  return (
    <div id="main-article" className="w-full min-w-[300px]">
      <section
        dangerouslySetInnerHTML={{ __html: returnBodyWithAnchorHeading(body) }}
        className="my-20 [&_h3]:heading-border-top [&_h3]:dark:heading-dark-border-top [&_h3]:editor-heading [&_h3]:dark:editor-dark-heading [&_p]:editor-paragraph [&_p]:dark:editor-dark-paragraph [&_strong]:font-extrabold [&_ol]:editor-ordered-list [&_ol]:editor-list [&_ol]:dark:editor-dark-list [&_ul]:editor-unordered-list [&_ul]:editor-list [&_ul]:dark:editor-dark-list [&_pre]:editor-code [&_a]:editor-link [&_blockquote]:editor-blockquote [&_blockquote]:dark:editor-dark-blockquote"
      />
      <Tags />
    </div>
  );
};

export default ArticleBody;
