const Loading = ({ size = 48, dark }: { size?: number; dark?: boolean }) => {
  return (
    <span
      className={`
        relative block rounded-full 
        before:content-[''] before:box-border 
        before:absolute before:inset-0 
        animate-rotate before:animate-prixClipFix
        before:rounded-full before:border-[5px] ${
          dark
            ? "before:border-base-neutral dark:before:border-base-100"
            : "before:border-base-100 dark:before:border-base-100"
        } 
      `}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Loading;
