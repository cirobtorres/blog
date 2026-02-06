import { Link } from "../Links";
import { P } from "../Typography/P";

export function Footer() {
  return (
    <footer
      className="h-footer flex items-center justify-center px-6 border-t border-neutral-900" // border-t border-zinc-900 dark:bg-zinc-950
    >
      <P className="text-sm text-neutral-500">
        Built by <Link href="https://nextjs.org/">Next.js</Link>. The source
        code is available on{" "}
        <Link href="https://github.com/cirobtorres/Blog">Github</Link>.
      </P>
    </footer>
  );
}
