import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-center px-6" // border-t border-zinc-900 dark:bg-zinc-950
    >
      <p className="text-sm text-zinc-500">
        Built by{" "}
        <Link
          href="/"
          className="font-semibold underline underline-offset-2 transition-colors hover:text-zinc-50"
        >
          Next.js
        </Link>
        . The source code is available on{" "}
        <Link
          href="/"
          className="font-semibold underline underline-offset-2 transition-colors hover:text-zinc-50"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
}
