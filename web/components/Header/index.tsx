import { linkVariants } from "../../utils/className";
import { A } from "../Typography/A";

const content = [
  {
    path: "/",
    text: "Consectetur",
  },
  {
    path: "/",
    text: "Cecessitatibus",
  },
  {
    path: "https://github.com/cirobtorres",
    text: "Github",
  },
];

export function Header() {
  return (
    <header className="h-full max-h-15 flex items-center px-6 border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="w-full flex items-center justify-between max-w-360 mx-auto">
        <nav className="md:flex flex-1 hidden gap-6">
          {content?.map(({ path, text }, index) => (
            <A
              key={index}
              href={path}
              className={linkVariants({ variant: "internal" })}
            >
              {text}
            </A>
          ))}
        </nav>
        <div className="md:flex hidden gap-6 ml-auto">
          <A href="/login">Entrar</A>
          <A href="/cadastro">Cadastrar</A>
        </div>
        <div />
      </div>
    </header>
  );
}
