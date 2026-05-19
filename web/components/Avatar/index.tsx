import Image from "next/image";
import { cn } from "../../utils/variants";

export function AvatarName({
  authorName,
  authorPicUrl,
  options,
}: {
  authorName?: string | undefined;
  authorPicUrl?: string | undefined | null;
  options?: {
    hideName?: boolean;
  };
}) {
  const name = authorName ?? "Anônimo";
  const hasVisibleName = !options?.hideName;
  const avatarAltText = hasVisibleName ? "" : `Avatar de ${name}`;
  const isNameHiden = name === "[Excluído]";
  const initials = isNameHiden
    ? "EX"
    : name
        .toUpperCase()
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("");

  return (
    <div className="flex items-center gap-4">
      {authorPicUrl ? (
        <Image
          src={authorPicUrl}
          alt={avatarAltText}
          width={32}
          height={32}
          className="shrink-0 rounded-full"
        />
      ) : (
        <span
          role="img"
          aria-hidden={hasVisibleName ? "true" : undefined}
          aria-label={hasVisibleName ? undefined : avatarAltText}
          className={cn(
            "size-8 p-1 shrink-0 flex justify-center items-center rounded-full font-semibold text-xs",
            isNameHiden
              ? "text-neutral-500 dark:text-neutral-500 bg-stone-200 dark:bg-stone-850"
              : "text-neutral-100 dark:text-neutral-100 bg-primary",
          )}
        >
          <span aria-hidden="true">{initials}</span>
        </span>
      )}

      {hasVisibleName && (
        <p
          className={cn(
            "font-medium",
            isNameHiden
              ? "text-neutral-500 dark:text-neutral-500"
              : "text-neutral-900 dark:text-neutral-100",
          )}
        >
          {name}
        </p>
      )}
    </div>
  );
}

export function AvatarPicture({
  authorName,
  authorPicUrl,
}: {
  authorName?: string;
  authorPicUrl?: string | null;
}) {
  const name = authorName ?? "Anônimo";
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
        {name}
      </p>
    </div>
  );
}
