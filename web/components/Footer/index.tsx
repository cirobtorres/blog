import { externalUrls } from "../../config/routes";
import { Link } from "../Links";

export function Footer() {
  return (
    <footer className="h-footer flex items-center justify-center px-6 text-center border-t bg-container">
      <div className="max-w-300 mx-auto">
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
          .<br />
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
