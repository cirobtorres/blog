export default function ArticleEditorsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
      <form>{children}</form>
    </section>
  );
}
