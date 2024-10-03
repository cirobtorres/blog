"use client";

import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { TiPlus } from "react-icons/ti";
import { IoHome, IoDocument, IoDocuments } from "react-icons/io5";
import { BsFileEarmarkRichtextFill } from "react-icons/bs";
import { FaTag, FaTags, FaGear } from "react-icons/fa6";
import { redirect, usePathname } from "next/navigation";
import { signOut } from "../../lib/authentication";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav
      id="dashboard-navbar"
      className="flex-shrink-0 z-[5] absolute tablet:static top-0 left-0 bottom-0 flex flex-col w-14 tablet:w-64 h-full hover:w-64 overflow-y-auto overflow-x-hidden transition-all duration-300 border-r border-base-border dark:border-dark-base-border bg-base-100 dark:bg-dark-base-100"
    >
      <Link
        href="/"
        className="p-2 h-12 border-b border-base-border dark:border-dark-base-border group"
      >
        <div className="rounded h-full flex items-center gap-4 p-2 text-start w-full tablet:px-2 transition-colors duration-200 hover:text-base-neutral-hover hover:dark:text-[#fff] text-base-neutral dark:text-dark-base-neutral text-xl uppercase font-extrabold max-[900px]:hover:dark:bg-dark-base-150">
          <IoHome className="flex-shrink-0 text-2xl tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
          Home
        </div>
      </Link>
      <div className="border-b border-base-border dark:border-dark-base-border tablet:pt-7 tablet:pb-8 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-4 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Artigos
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a]:px-4 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.endsWith("/painel") || pathname.includes("/artigos")
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel">
              <BsFileEarmarkRichtextFill className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Todos os artigos</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-b border-base-border dark:border-dark-base-border tablet:pt-7 tablet:pb-8 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-4 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Rascunhos
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a]:px-4 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.endsWith("/painel/rascunhos") // /^\/painel\/rascunhos.*/
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/rascunhos">
              <IoDocuments className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Todos os Rascunhos</span>
            </Link>
          </li>
          <li
            className={
              pathname.match(/^\/painel\/rascunhos\/.*/) // /^\/painel\/rascunhos\/criar.*/
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/rascunhos/criar">
              <div className="relative tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto">
                <IoDocument />
                <TiPlus className="text-sm absolute -right-[25%] -bottom-[25%] bg-base-100 dark:bg-dark-base-100 rounded-full" />
              </div>
              <span>Criar rascunho</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-b border-base-border dark:border-dark-base-border tablet:pt-7 tablet:pb-8 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-4 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Tags
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a]:px-4 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
          <li
            className={
              pathname.match(/^\/painel\/tags.*/)
                ? "dashboard-active"
                : undefined
            }
          >
            <Link href="/painel/tags">
              <FaTags className="tablet:invisible tablet:hidden tablet:opacity-0 tablet:w-0 visible block opacity-100 w-auto" />
              <span>Todas as tags</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="tablet:pt-7 tablet:pb-4 max-[900px]:p-2">
        <div className="invisible hidden opacity-0 w-0 tablet:visible tablet:block tablet:opacity-100 tablet:w-auto pl-4 mb-2">
          <span className="text-base-neutral dark:text-[#747474] text-xs">
            Conta
          </span>
        </div>
        <ul className="w-full sticky top-0 self-start text-nowrap list-none flex flex-col gap-2 [&_li_svg]:flex-shrink-0 [&_li_a]:flex [&_li_a]:items-center [&_li_a]:gap-4 [&_li_a]:p-2 tablet:[&_li_a]:px-4 tablet:[&_li_a:hover]:text-base-neutral-hover tablet:[&_li_a:hover]:dark:text-[#fff] tablet:[&_li_a]:py-0 max-[900px]:[&_li_a:hover]:bg-base-150 max-[900px]:[&_li_a:hover]:dark:bg-dark-base-150 [&_li_a]:transition-colors [&_li_a]:duration-200 [&_li]:text-2xl [&_li_a_span]:block [&_li_a_span]:text-sm [&_li]:text-base-neutral [&_li]:dark:text-dark-base-neutral [&_li]:rounded [&_li.dashboard-active]:text-base-green [&_li.dashboard-active]:dark:text-dark-base-green">
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
        <div className="border-t border-base-border dark:border-dark-base-border mt-2 tablet:mt-8 pt-2 tablet:pt-4">
          <button
            onClick={(event) => {
              event.preventDefault();
              signOut();
              redirect("/");
            }}
            className="rounded flex items-center gap-4 p-2 tablet:p-0 text-start w-full tablet:px-4 transition-colors duration-200 hover:text-base-neutral-hover hover:dark:text-[#fff] text-base-neutral dark:text-dark-base-neutral text-sm max-[900px]:hover:dark:bg-dark-base-150"
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
