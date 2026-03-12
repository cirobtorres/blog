import Image from "next/image";
import { cn } from "../../utils/variants";
import { Link } from "../Links";

export function CardGrid({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-3 gap-4"
      {...props}
    />
  );
}

export function CardLink({ ...props }): ExternalLinkProps {
  return (
    <Link
      {...props}
      className="p-2 rounded-xl border border-transparent focus-visible:border-border"
    />
  );
}

export function CardWrapper({ ...props }: React.ComponentProps<"article">) {
  return (
    <article
      className="max-w-full mx-auto flex flex-col justify-between gap-2"
      {...props}
    />
  );
}

export function CardCreatedAt({
  createdAt,
  ...props
}: React.ComponentProps<"time"> & { createdAt?: string }) {
  return (
    <small>
      <time {...props} className="text-neutral-400 dark:text-neutral-500">
        {createdAt}
      </time>
    </small>
  );
}

export function CardHeader({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "text-lg text-neutral-900 dark:text-neutral-100",
        props.className,
      )}
    />
  );
}

export function CardDescription({ ...props }: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className="text-sm font-normal text-neutral-400 dark:text-neutral-500"
    />
  );
}

// ---

export function CardImageWrapper({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "relative w-full max-w-full rounded-xl overflow-hidden aspect-video",
        props.className,
      )}
    />
  );
}

export function CardImage({
  src,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      fill
      className={cn("absolute object-cover", props.className)}
    />
  );
}
