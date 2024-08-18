"use client";

import { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";

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
      <button onClick={() => setIsOpen(!isOpen)} className="group">
        <IoChatbubbleEllipses
          className={`
          text-4xl 
          transition-all duration-300 group-active:scale-[0.95]
          ${
            isOpen
              ? "text-base-blue dark:text-dark-base-blue"
              : "group-hover:text-[#442255] group-hover:dark:text-[#b8bdc9] text-base-neutral dark:text-dark-base-neutral"
          }
            
        `}
        />
      </button>
      <section
        className={`
          w-full h-96 fixed top-20 left-0 py-8 
          transition-all duration-300 
          bg-base-200 dark:bg-dark-base-200 
          ${isOpen ? "opacity-100" : "opacity-0"} 
        `}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <article className="max-w-webpage mx-auto flex flex-col gap-10">
          <span
            className={`transition-all duration-200 ${
              isOpen
                ? "delay-75 translate-x-0 opacity-100"
                : "opacity-0 -translate-x-4"
            }`}
          >
            Hello World 1
          </span>
          <span
            className={`transition-all duration-200 ${
              isOpen
                ? "delay-150 translate-x-0 opacity-100"
                : "opacity-0 -translate-x-4"
            }`}
          >
            Hello World 2
          </span>
          <span
            className={`transition-all duration-200 ${
              isOpen
                ? "delay-[225ms] translate-x-0 opacity-100"
                : "opacity-0 -translate-x-4"
            }`}
          >
            Hello World 3
          </span>
        </article>
      </section>
    </div>
  );
}
