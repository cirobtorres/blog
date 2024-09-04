const Loading = ({ size = 48, color }: { size?: number; color?: string }) => {
  return (
    <span
      className={`
        relative block rounded-full 
        before:content-[''] before:box-border 
        before:absolute before:inset-0 
        animate-rotate before:animate-prixClipFix
        before:rounded-full before:border-[5px] 
        ${color ?? "before:border-base-neutral"} 
        dark:before:border-dark-base-neutral 
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default Loading;
