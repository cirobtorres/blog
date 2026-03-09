import { cn } from "../../utils/className";

export function CardGrid({ ...props }: React.ComponentProps<"div">) {
  return <div className="grid grid-cols-1 gap-4" {...props} />;
}

export function CardWrapper({ ...props }: React.ComponentProps<"article">) {
  return (
    <article
      className="max-w-full mx-auto flex flex-col justify-between gap-2 border p-4 rounded-lg bg-linear-150 from-0% to-75% from-neutral-900 to-neutral-950 hover:border-primary transition-border duration-300 hover:-translate-y-1"
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

// type BannerHeight = "sm" | "md" | "lg" | "xl";

// const heightMap: Record<BannerHeight, string> = {
//   sm: "h-48",
//   md: "h-64",
//   lg: "h-80",
//   xl: "h-96",
// };

// export function CardImageWrapper({
//   h = "xl",
//   ...props
// }: React.ComponentProps<"div"> & { h?: BannerHeight }) {
//   return (
//     <div
//       {...props}
//       className={cn(
//         "relative w-full max-w-full overflow-hidden",
//         heightMap[h],
//         props.className,
//       )}
//     />
//   );
// }

// export function CardImage({
//   src,
//   alt,
//   ...props
// }: React.ComponentProps<typeof Image>) {
//   return (
//     <Image
//       {...props}
//       src={src}
//       alt={alt}
//       fill
//       className={cn("absolute object-cover", props.className)}
//     />
//   );
// }
