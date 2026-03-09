import { useState } from "react";
import { cn, focusRing, inputBorder } from "../../utils/className";

const CopyToClipBoard = ({
  toCopy,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "type" | "disabled"> & {
  toCopy: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCopy = () => {
    if (!toCopy) return;

    navigator.clipboard.writeText(toCopy);

    setCopied(true);
    setDisable(true);

    setTimeout(() => setCopied(false), 4000);
    setTimeout(() => setDisable(false), 4000);
  };

  return (
    <button
      {...props}
      disabled={disable}
      type="button"
      onClick={handleCopy}
      className={cn(
        "cursor-pointer inline-flex items-center text-center text-nowrap text-xs text-muted-foreground font-medium space-x-2 px-2 py-1.25 max-w-24 transition-[color,border,box-shadow] duration-300 rounded disabled:cursor-auto disabled:bg-[#1f1f1f]",
        inputBorder,
        focusRing,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-copy-icon lucide-copy"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      <span className="truncate">{copied ? "Copiado" : "Copiar"}</span>
    </button>
  );
};

export default CopyToClipBoard;
