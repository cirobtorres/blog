import { Button } from "../../../Button";
import Spinner from "../../../Spinner";

export default function ArticleButton({
  className,
  ...props
}: BlogButton & {
  className?: string;
}) {
  const { children, disabled } = props;
  return (
    <Button type="submit" className={className} {...props}>
      {disabled && <Spinner />} {children}
    </Button>
  );
}
