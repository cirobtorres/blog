import { cn } from "../../utils/className";

type AlertType = "success" | "info" | "warn" | "error";

const Alert = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type?: AlertType;
}) => {
  const getType = (switchType?: AlertType) => {
    switch (switchType) {
      case "success":
        return "border-success from-success/30 to-success/10";
      case "info":
        return "border-informative from-informative/30 to-informative/10";
      case "warn":
        return "border-warning from-warning/30 to-warning/10";
      case "error":
        return "border-destructive from-destructive/30 to-destructive/10";
      default:
        return "from-neutral-600/30 to-neutral-600/10";
    }
  };

  const chosenType = getType(type);

  return (
    <div
      className={cn(
        "border p-4 rounded bg-linear-90 from-5% to-90%",
        chosenType,
      )}
    >
      <p className="text-xs font-medium text-neutral-300">{children}</p>
    </div>
  );
};

export { Alert };
