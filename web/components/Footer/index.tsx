import { externalUrls } from "../../config/routes";
import { Link } from "../Links";

export function Footer() {
  return (
    <footer className="h-footer flex items-center justify-center border-t px-6 text-center bg-muted dark:bg-card">
      <p className="font-sans text-sm text-muted-foreground">
        Built by{" "}
        <Link
          href="https://nextjs.org/"
          variant="external"
          className="text-primary underline underline-offset-2"
        >
          Next.js
        </Link>
        . The source code is available on{" "}
        <Link
          href={externalUrls.myGitHub}
          variant="external"
          className="text-primary underline underline-offset-2"
        >
          Github
        </Link>
        .
      </p>
    </footer>
  );
}
