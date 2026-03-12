import { externalUrls } from "../../config/routes";
import { Link } from "../Links";

export function Footer() {
  return (
    <footer className="h-footer flex items-center justify-center px-6 text-center border-t bg-stone-200 dark:bg-stone-900">
      <div className="max-w-300 mx-auto">
        <p className="text-sm text-neutral-500">
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
            href={externalUrls.blogGitHub}
            variant="external"
            className="text-primary underline underline-offset-2"
          >
            Github
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
