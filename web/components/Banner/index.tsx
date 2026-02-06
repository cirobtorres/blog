import Image from "next/image";
import { cn } from "../../utils/className";

type BannerHeight = "sm" | "md" | "lg" | "xl";

const heightMap: Record<BannerHeight, string> = {
  sm: "h-48",
  md: "h-64",
  lg: "h-80",
  xl: "h-96",
};

export function Banner({ h = "lg" }: { h: BannerHeight }) {
  return (
    <div className={cn("relative w-full max-w-full", heightMap[h])}>
      <Image
        src="https://placehold.co/1920x480/0a0a0a/f5f5f5/jpg"
        alt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, eveniet!"
        fill
        className="absolute object-cover"
      />
    </div>
  );
}
