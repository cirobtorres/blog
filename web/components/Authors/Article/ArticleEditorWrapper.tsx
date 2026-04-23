export default function ArticleEditorsWrapper({
  children,
  action,
  onSubmit,
}: {
  children: React.ReactNode;
  action?: (payload: FormData) => void;
  onSubmit: React.SubmitEventHandler<HTMLFormElement> | undefined;
}) {
  return (
    <section className="w-full max-w-6xl mx-auto my-6 px-2 flex-1 flex flex-col">
      <form action={action} onSubmit={onSubmit}>
        {children}
      </form>
    </section>
  );
}
