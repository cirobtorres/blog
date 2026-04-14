import Image from "next/image";

export function Avatar({
  authorName,
  authorPicUrl,
}: {
  authorName: string;
  authorPicUrl?: string | null;
}) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={authorPicUrl ?? "/images/not-authenticated.png"}
        alt="Avatar do autor do artigo"
        aria-label="Avatar do autor do artigo"
        width={32}
        height={32}
        className="shrink-0 rounded-full"
      />
      <p className="text-neutral-900 dark:text-neutral-100 font-medium">
        {authorName}
      </p>
    </div>
  );
}
