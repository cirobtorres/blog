"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/lib/authentication";

export default function MainMenu({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative h-full flex items-center">
      <MainMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainMenuContent user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

const MainMenuButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)} className="h-full group">
      <HiEllipsisHorizontal
        className={`
          text-4xl 
          transition-all duration-300 group-active:scale-[0.90]
          ${
            isOpen
              ? "text-base-green dark:text-dark-base-green"
              : "group-hover:text-base-neutral-hover group-hover:dark:text-dark-base-neutral-hover text-base-neutral dark:text-dark-base-neutral"
          }
        `}
      />
    </button>
  );
};

const MainMenuContent = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User | null;
}) => {
  return (
    <section
      className={`
          absolute top-[calc(100%_+_4px)] right-0 w-72 
          rounded-xl border border-base-100 dark:border-dark-base-border
          bg-base-150 dark:bg-dark-base-150 overflow-hidden
          ${
            isOpen
              ? "transition-all ease-in-out duration-[250ms] opacity-100 scale-100 translate-x-0 translate-y-0" // transition-all duration-500 delay-[100ms] main-menu-open-animation
              : "transition-all ease-in-out duration-[250ms] opacity-0 scale-75 translate-x-4 -translate-y-8" // transition-all duration-500 delay-[300ms] main-menu-close-animation
          }
        `}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <article className="max-w-webpage mx-auto flex gap-10">
        <div className="w-full flex flex-col">
          <div className="flex items-center px-4 py-1 gap-3 bg-base-200 dark:bg-dark-base-200">
            {user ? (
              <Link
                href="/perfil"
                className="truncate max-w-full font-extrabold text-base text-base-neutral dark:text-dark-base-neutral transition-colors duration-300 hover:text-base-green-hover dark:hover:text-dark-base-green-hover"
              >
                {user.email}
              </Link>
            ) : (
              <span
                // href="/entrar"
                // onClick={() => setIsOpen(!isOpen)}
                className="truncate max-w-full font-extrabold text-base text-base-neutral dark:text-dark-base-neutral transition-colors duration-300" // hover:text-base-green-hover dark:hover:text-dark-base-green-hover
              >
                Olá, visitante
              </span>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="mr-0 ml-auto">
              <IoClose className="text-2xl dark:text-dark-base-neutral dark:hover:text-dark-base-neutral-hover p-1 rounded-lg border border-base-border dark:border-dark-base-border" />
            </button>
          </div>
          <div className="w-full flex flex-col">
            <Link
              href="/artigos"
              className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
            >
              Artigos
            </Link>
            <Link
              href="/contato"
              className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
            >
              Contato
            </Link>
            <Link
              href="/sobre-mim"
              className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
            >
              Sobre mim
            </Link>
            {user ? (
              <>
                <Link
                  href="/artigos/criar-artigo"
                  onClick={() => setIsOpen(!isOpen)}
                  className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
                >
                  Criar artigo
                </Link>
                <Link
                  href="/"
                  className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
                >
                  Painel de artigos
                </Link>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    setIsOpen(!isOpen);
                    signOut();
                  }}
                  className="text-left transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/entrar"
                onClick={() => setIsOpen(!isOpen)}
                className="transition-all px-4 py-1 text-base text-base-neutral dark:text-dark-base-neutral hover:bg-base-100 dark:hover:bg-dark-base-100"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
