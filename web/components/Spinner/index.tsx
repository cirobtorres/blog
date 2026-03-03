import { cn } from "../../utils/className";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-4 inline-block animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white",
        className,
      )}
      role="status"
    />
  );
}
