"use client";

import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav
      id="dashboard-navbar"
      className="z-[5] absolute top-0 left-0 bottom-0 w-14 h-full hover:w-52 overflow-hidden p-2 transition-all duration-300 border-r border-base-200 dark:border-dark-base-border bg-base-150 dark:bg-dark-base-300"
    >
      <ul className="sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:px-2 [&_li_a]:py-2 [&_li_a:hover]:bg-base-300 [&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green [&_li.dashboard-active]:bg-base-300 [&_li.dashboard-active]:dark:bg-dark-base-150">
        <li
          className={
            pathname.endsWith("/painel") ? "dashboard-active" : undefined
          }
        >
          <Link href="/painel">
            <IoIosHome />
            <span>Home</span>
          </Link>
        </li>
        <li
          className={
            pathname.endsWith("/painel/criar-artigo")
              ? "dashboard-active"
              : undefined
          }
        >
          <Link href="/painel/criar-artigo">
            <PiArticleNyTimesFill />
            <span>Criar artigo</span>
          </Link>
        </li>
        <li
          className={
            pathname.endsWith("/painel/configurar")
              ? "dashboard-active"
              : undefined
          }
        >
          <Link href="/painel/configurar">
            <FaGear />
            <span>Configurar</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
