export default function ArticleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="w-full max-w-article-body my-6 overflow-hidden">
      {children}
    </article>
  );
}
