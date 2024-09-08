import Link from "next/link";
import { FaGithub, FaRegCopyright } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-base-100 dark:bg-dark-base-100">
      <div className="max-w-webpage mx-auto">
        <div className="py-16 mx-4 smartphone:mx-10 tablet:mx-20 flex flex-col items-center">
          <div className="inline-grid">
            <div className="[grid-column-start:1] [grid-row-start:1] w-28 h-0.5 rounded-full mb-16 bg-gradient-to-r from-pink-500 via-cyan-500 to-emerald-500 blur pointer-events-none" />
            <div className="[grid-column-start:1] [grid-row-start:1] w-28 h-0.5 rounded-full mb-16 bg-gradient-to-r from-pink-500 via-cyan-500 to-emerald-500" />
          </div>
          <span className="text-sm flex gap-1 max-[450px]:gap-0 max-[450px]:flex-col text-base-neutral dark:text-dark-base-neutral">
            Find an issue with this page?{" "}
            <Link
              href="/"
              className="text-base-green dark:text-dark-base-green hover:underline"
            >
              Propose a fix to it on GitHub
            </Link>
          </span>
          <span className="text-sm flex items-center gap-3 text-base-neutral dark:text-dark-base-neutral">
            You may find me on
            <Link href="/">
              <FaGithub />
            </Link>
            <Link href="/">
              <FaXTwitter />
            </Link>
          </span>
          <span className="text-sm flex items-center gap-1 text-base-neutral dark:text-dark-base-neutral">
            Copyright <FaRegCopyright /> 2024 • Ciro Torres
          </span>
        </div>
      </div>
    </footer>
  );
}

export function AuthFooter() {
  return (
    <footer className="w-full flex flex-col items-center py-28 gap-3 bg-base-200 dark:bg-dark-base-200"></footer>
  );
}
