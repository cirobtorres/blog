export default function NoCardsFoundPlaceholder({
  mediaResponse,
}: {
  mediaResponse: Response;
}) {
  return (
    <div className="w-full max-w-xl mx-auto opacity-50 mt-4 min-h-80 rounded-xl border grid grid-rows-[40px_1fr] overflow-hidden">
      <div className="w-full h-full border-b flex items-center justify-start px-3 gap-2 dark:bg-stone-800">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="size-2 rounded-full dark:bg-white" />
        ))}
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2 px-10 dark:bg-stone-900">
        <strong className="text-7xl">{mediaResponse.status}</strong>
        {mediaResponse.statusText && (
          <div className="px-10">
            <p className="text-xl text-center line-clamp-3">
              {mediaResponse.statusText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
