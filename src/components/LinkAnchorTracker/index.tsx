"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import collectH3Contents from "../../functions/collectH3Contents";

const LinkAnchorTracker = ({ body }: { body: string }) => {
  const [hide, setHide] = useState(false);
  const h3Body = collectH3Contents(body);

  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById("main-article")
      ?.querySelectorAll("h3");
    let currentSectionIndex = 0;

    if (sections) {
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const headerHeight = 80;
        if (window.scrollY >= sectionTop - headerHeight) {
          currentSectionIndex = index;
        }
      });
      const links = document
        .getElementById("link-anchor-tracker")
        ?.querySelectorAll("li a");

      links?.forEach((link, index) => {
        if (index === currentSectionIndex) {
          link.setAttribute("aria-current", "page");
        } else {
          link.setAttribute("aria-current", "false");
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", linkAnchorsListener);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", linkAnchorsListener);
    };
  }, []);

  return (
    <nav className="w-[280px] h-full flex-shrink-0 sticky top-16 bottom-16 my-20">
      <button
        onClick={() => setHide(!hide)}
        className="flex ml-auto mr-0 items-center font-extrabold uppercase text-xl pr-1 text-base-neutral dark:text-dark-base-neutral"
      >
        Conteúdo
        <MdKeyboardArrowDown
          className="text-3xl transition-transform"
          style={{ transform: hide ? "" : "rotate(-180deg)" }}
        />
      </button>
      <ul
        id="link-anchor-tracker"
        className="max-h-[70vh] text-right pb-6 transition-colors duration-300 overflow-auto scrollbar dark:dark-scrollbar pr-1"
        style={{ visibility: hide ? "hidden" : "visible" }}
      >
        {h3Body?.map((text, index) => (
          <li key={index} className="mb-1">
            <Link
              href={`#anchor-${index}`}
              aria-current={index === 0 ? "page" : "false"}
              className="text-sm text-base-neutral dark:text-dark-base-neutral hover:text-base-green-hover hover:dark:text-dark-base-green-hover aria-current:text-base-green dark:aria-current:text-dark-base-green"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LinkAnchorTracker;
