import { Button } from "../Button";

export default function CommentEditButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return <EditButton onClick={onClick} />;
}

const EditButton = ({ ...props }: React.ComponentProps<typeof Button>) => (
  <Button
    type="button"
    variant="ghost"
    className="w-20 h-8 text-neutral-900 dark:text-neutral-100 not-dark:shadow-none"
    {...props}
  >
    Editar
  </Button>
);
