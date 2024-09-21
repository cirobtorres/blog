"use client";

import Link from "next/link";
import { IoIosHome } from "react-icons/io";
import { PiSignOutBold, PiArticleNyTimesFill } from "react-icons/pi";
import { MdDashboardCustomize } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { redirect, usePathname } from "next/navigation";
import { signOut } from "../../lib/authentication";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav
      id="dashboard-navbar"
      className="z-[5] absolute tablet:static top-0 left-0 bottom-0 flex flex-col w-14 tablet:w-64 h-full hover:w-64 overflow-hidden transition-all duration-300 border-r border-base-200 dark:border-dark-base-border bg-base-100 dark:bg-dark-base-100"
    >
      <div className="border-b borde-base-200 dark:border-dark-base-border tablet:pt-7 tablet:pb-8 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-2 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Artigos
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.endsWith("/painel") ? "dashboard-active" : undefined
            }
          >
            <Link href="/painel">
              <MdDashboardCustomize className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Todos os artigos</span>
            </Link>
          </li>
          <li
            className={
              pathname.match(/^\/painel\/criar-artigo.*/)
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/criar-artigo">
              <PiArticleNyTimesFill className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Editar artigo</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-b borde-base-200 dark:border-dark-base-border tablet:pt-7 tablet:pb-8 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-2 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Rascunhos
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.match(/^\/painel\/todos-os-rascunhos.*/)
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel">
              <ImBooks className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Todos os Rascunhos</span>
            </Link>
          </li>
          <li
            className={
              pathname.match(/^\/painel\/criar-rascunho.*/)
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/criar-rascunho">
              <BsPencilSquare className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Criar rascunho</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-b borde-base-200 dark:border-dark-base-border tablet:pt-7 tablet:pb-4 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-2 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Conta
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.endsWith("/painel/configurar")
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/configurar">
              <FaGear className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Configurar</span>
            </Link>
          </li>
        </ul>
        <div className="border-t borde-base-200 dark:border-dark-base-border mt-2 tablet:mt-8 pt-2 tablet:pt-4 tablet:pl-2">
          <button
            onClick={(event) => {
              event.preventDefault();
              signOut();
              redirect("/");
            }}
            className="rounded flex items-center gap-4 p-2 tablet:p-0 text-start w-full transition-colors duration-200 hover:dark:text-[#fff] text-base-neutral dark:text-dark-base-neutral text-sm max-[900px]:hover:dark:bg-dark-base-150"
          >
            <PiSignOutBold className="flex-shrink-0 text-2xl tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
