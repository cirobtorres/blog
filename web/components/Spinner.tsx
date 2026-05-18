"use client";

import { cn } from "../utils/variants";

interface SonnerLoaderProps {
  className?: string;
}

export default function SonnerLoader({ className }: SonnerLoaderProps) {
  const bars = Array.from({ length: 12 });

  return (
    <div
      role="status"
      aria-label="Carregando"
      className={cn(
        "relative inline-block size-5 text-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      {bars.map((_, index) => {
        const rotate = index * 30;
        const delay = -1.1 + index * 0.1;

        return (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full animate-spinner-fade"
            style={{
              transform: `rotate(${rotate}deg)`,
              animationDelay: `${delay.toFixed(1)}s`,
            }}
          >
            <div className="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full" />
          </div>
        );
      })}
    </div>
  );
}
