import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";

export default function DashboardPage() {
  return (
    <div className="w-full h-full grid grid-cols-[auto_1fr] border-b border-base-200 dark:border-dark-base-border">
      <nav
        id="dashboard-navbar"
        className="w-14 hover:w-52 overflow-hidden h-full py-1 px-2 transition-all duration-300 border-r border-base-200 dark:border-dark-base-border bg-base-100 dark:bg-dark-base-300"
      >
        <ul className="flex flex-col gap-2 text-nowrap sticky top-0 self-start list-none [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:px-2 [&_li_a]:py-2 [&_li_a:hover]:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green [&_li.dashboard-active]:bg-dark-base-150">
          <li className="dashboard-active">
            <Link href="/painel">
              <IoIosHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/painel/criar-artigo">
              <PiArticleNyTimesFill />
              <span>Criar artigo</span>
            </Link>
          </li>
          <li>
            <Link href="/painel/configurar">
              <FaGear />
              <span>Configurar</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full h-full bg-base-100 dark:bg-dark-base-100"></div>
    </div>
  );
}
