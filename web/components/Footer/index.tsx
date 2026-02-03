import { A } from "../Links";
import { P } from "../Typography/P";

export function Footer() {
  return (
    <footer
      className="flex items-center justify-center px-6" // border-t border-zinc-900 dark:bg-zinc-950
    >
      <P className="text-sm text-neutral-500">
        Built by <A href="https://nextjs.org/">Next.js</A>. The source code is
        available on <A href="https://github.com/cirobtorres/Blog">Github</A>.
      </P>
    </footer>
  );
}
