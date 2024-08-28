import Link from "next/link";
import NightThemeSwitcher from "../../NightThemeSwitch";
import MegaMenu from "../../MegaMenu";
import MainMenu from "@/components/MainMenu";

export default function StaticHeader({ theme }: { theme: string }) {
  return (
    <header
      id="static-header"
      className="transition-[top] duration-300 h-16 w-full z-10 bg-base-200 dark:bg-dark-base-200 border-b border-base-100 dark:border-dark-base-border"
    >
      <div className="h-full -translate-y-full animate-header">
        <nav className="h-full flex items-center justify-between max-w-webpage mx-auto">
          <ul className="h-full grid grid-cols-header items-center justify-between">
            <li className="flex justify-center group">
              <Link
                href="/"
                className="text-xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral group-hover:text-base-neutral-hover group-hover:dark:text-[#b8bdc9]"
              >
                HOME
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Artigos
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Contato
              </Link>
            </li>
            <li className="h-full text-center">
              <Link
                href="/sobre-mim"
                className="h-full flex items-center font-[500] hover:text-base-green dark:hover:text-dark-base-green text-base-neutral dark:text-dark-base-neutral"
              >
                Sobre mim
              </Link>
            </li>
          </ul>
          <li className="h-full">
            <MainMenu />
          </li>
          <ul className="h-full flex items-center justify-between gap-8">
            <Link
              href="entrar"
              className="text-xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral group-hover:text-base-neutral-hover group-hover:dark:text-[#b8bdc9]"
            >
              Entrar
            </Link>
            <li className="flex justify-center items-center h-full">
              <NightThemeSwitcher theme={theme} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
