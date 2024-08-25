"use client";

import { useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { InlineArticleCard } from "../ArticleCard";
import Link from "next/link";

export default function MegaMenu() {
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
    <div ref={menuRef} className="h-full flex items-center">
      <MegaMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MegaMenuContent isOpen={isOpen} />
    </div>
  );
}

const MegaMenuButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <button onClick={() => setIsOpen(!isOpen)} className="group">
      <FaEllipsisH
        className={`
          text-4xl 
          transition-all duration-300 group-active:scale-[0.90]
          ${
            isOpen
              ? "text-base-green dark:text-dark-base-green"
              : "group-hover:text-[#442255] group-hover:dark:text-[#b8bdc9] text-base-neutral dark:text-dark-base-neutral"
          }
        `}
      />
    </button>
  );
};

const MegaMenuContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <section
      className={`
          w-full h-96 fixed top-20 left-0 py-8
          transition-all duration-500
          bg-base-200 dark:bg-dark-base-200
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <article className="max-w-webpage mx-auto flex gap-10">
        <div
          className={`w-1/4 flex flex-col gap-1 transition-all duration-200 ${
            isOpen
              ? "delay-150 translate-x-0 opacity-100"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <h2 className="text-xl text-center uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral mb-3">
            Entrar
          </h2>
          <Link
            href="/"
            className="flex flex-1 justify-center items-center text-xl px-2 py-1 font-[500] rounded-lg text-base-neutral bg-base-100 hover:bg-base-200"
          >
            Entrar
          </Link>
          <Link
            href="/"
            className="flex flex-1 justify-center items-center text-xl px-2 py-1 font-[500] rounded-lg text-dark-base-100 bg-dark-base-green hover:bg-dark-base-green-hover"
          >
            Cadastrar
          </Link>
          <Link
            href="/"
            className="flex flex-1 justify-center items-center text-xl px-2 py-1 font-[500] rounded-lg text-dark-base-100 bg-dark-base-red hover:bg-dark-base-red-hover"
          >
            Google
          </Link>
          <Link
            href="/"
            className="flex flex-1 justify-center items-center text-xl px-2 py-1 font-[500] rounded-lg text-dark-base-100 bg-dark-base-blue hover:bg-dark-base-blue-hover"
          >
            Facebook
          </Link>
        </div>
        <div
          className={`w-full transition-all duration-200 ${
            isOpen
              ? "delay-[225ms] translate-x-0 opacity-100"
              : "opacity-0 -translate-x-4"
          }`}
        >
          <h2 className="text-xl text-center uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral mb-3">
            Recentes
          </h2>
          <div className="flex gap-3">
            <div
              className={`w-full transition-all duration-200 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <InlineArticleCard />
            </div>
            <div
              className={`w-full transition-all duration-200 ${
                isOpen
                  ? "delay-[75ms] translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <InlineArticleCard />
            </div>
            <div
              className={`w-full transition-all duration-200 ${
                isOpen
                  ? "delay-[150ms] translate-x-0 opacity-100"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <InlineArticleCard />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
