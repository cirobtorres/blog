import { cn } from "../../../../utils/variants";
import { Button } from "../../../Buttons";

const RenewCodeButton = ({
  onClick,
  isResending,
  countdown,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isResending: boolean;
  countdown: number;
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
    disabled={isResending || countdown > 0}
    className="text-xs min-[450px]:text-sm h-fit py-1 rounded-full hover:border-stone-400 disabled:opacity-50 disabled:text-neutral-300 disabled:border-stone-400 disabled:bg-stone-400 dark:disabled:text-stone-700 dark:disabled:border-stone-800 dark:disabled:bg-stone-900"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-3 min-[450px]:size-4",
        isResending ? "animate-spin" : "",
      )}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
    Reenviar código {countdown > 0 && countdown}
  </Button>
);

export default RenewCodeButton;
