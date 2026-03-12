import Image from "next/image";
import { cn } from "../../utils/variants";

export function CardGrid({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-3 gap-4"
      {...props}
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

export function CardHeader({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("p-1", props.className)} />;
}

export function CardBody({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className="flex flex-col gap-2" />;
}

export function CardFooter({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn(props.className)} />;
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
        "relative w-full max-w-full rounded-xl overflow-hidden",
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
