import { cn } from "../../utils/className";
import Image from "next/image";

export function CardGrid({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      {...props}
    />
  );
}

export function CardWrapper({ ...props }: React.ComponentProps<"article">) {
  return (
    <article
      aria-label=""
      data-slot=""
      {...props}
      className="max-w-full min-h-90 mx-auto flex flex-col justify-between rounded-lg border border-border bg-neutral-950"
    />
  );
}

export function CardHeader({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("p-1", props.className)} />;
}

export function CardBody({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className="flex flex-col p-4 gap-2" />;
}

export function CardFooter({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("p-1", props.className)} />;
}

// ---

type BannerHeight = "sm" | "md" | "lg" | "xl";

const heightMap: Record<BannerHeight, string> = {
  sm: "h-48",
  md: "h-64",
  lg: "h-80",
  xl: "h-96",
};

export function CardImageWrapper({
  h = "xl",
  ...props
}: React.ComponentProps<"div"> & { h?: BannerHeight }) {
  return (
    <div
      {...props}
      className={cn(
        "relative w-full max-w-full overflow-hidden",
        heightMap[h],
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
