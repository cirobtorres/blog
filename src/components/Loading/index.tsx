const Loading = ({ size = 48 }: { size?: number }) => {
  return (
    <span
      className="relative block rounded-full before:content-[''] before:box-border before:absolute before:inset-0 animate-rotate before:animate-prixClipFix before:rounded-full before:border-[5px] before:border-base-neutral dark:before:border-base-100"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

const EditorLoadingSleketon = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap gap-1 mb-3">
        {[...Array(12)].map((index) => (
          <div
            key={index}
            className="size-10 rounded-xl animate-skeleton dark:animate-dark-skeleton"
          />
        ))}
      </div>
      <div className="flex flex-col rounded-xl py-3 shadow-md overflow-x-hidden">
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[340px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[510px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[280px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-12 max-w-[490px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[240px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-12 max-w-[580px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-24 max-w-[200px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[450px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[190px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 mb-3 max-w-[250px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
        <span className="flex-shrink h-4 mx-3 max-w-[440px] rounded-full animate-skeleton dark:animate-dark-skeleton" />
      </div>
    </div>
  );
};

export { EditorLoadingSleketon };
export default Loading;
