import { externalUrls } from "../../routing/routes";
import { Link } from "../Links";

export function Footer() {
  return (
    <footer className="h-footer flex items-center justify-center mt-12 px-6 text-center border-t bg-stone-200 dark:bg-stone-900">
      <div className="max-w-300 mx-auto flex flex-col items-center justify-center">
        <p className="text-xs text-neutral-500">
          Built with{" "}
          <Link
            href="https://nextjs.org/"
            variant="external"
            className="text-xs"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link
            href="https://spring.io/projects/spring-boot"
            variant="external"
            className="text-xs"
          >
            Spring Boot
          </Link>
          .
        </p>
        <p className="text-xs text-neutral-500">
          The source code is available on{" "}
          <Link
            href={externalUrls.blogGitHub}
            variant="external"
            className="text-xs"
          >
            Github
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
