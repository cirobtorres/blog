import { linkVariants } from "../../utils/className";
import { A } from "../Links";

const header = [
  {
    path: "/",
    text: "Consectetur",
  },
  {
    path: "/",
    text: "Cecessitatibus",
  },
  {
    path: "https://google.com.br",
    text: "Consectetur",
  },
];

export function Header() {
  return (
    <header className="flex items-center px-6 border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="w-full flex items-center justify-between max-w-360 mx-auto">
        <nav className="flex gap-6">
          {header.map(({ path, text }, index) => (
            <A
              key={index}
              href={path}
              className={linkVariants({ variant: "internal" })}
            >
              {text}
            </A>
          ))}
        </nav>
        <div />
      </div>
    </header>
  );
}
