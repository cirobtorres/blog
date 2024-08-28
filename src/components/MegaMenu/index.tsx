"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaEllipsis, FaEllipsisVertical } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { InlineArticleCard } from "../ArticleCard";

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
      <FaEllipsis
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
        ></div>
      </article>
    </section>
  );
};
