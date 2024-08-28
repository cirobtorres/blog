"use client";

import { useEffect } from "react";
import BackToTopButton from "../../../../components/BackToTopButton";
import LinkAnchorTracker from "@/components/LinkAnchorTracker";
import ArticleHero from "@/components/ArticleHero";
import ArticleBody from "@/components/ArticleBody";
import Tags from "../../../../components/Tags";
import RelatedArticles from "@/components/RelatedArticles";

const links = [
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde dicta quas.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    text: "Lorem ipsum dolor sit amet.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    text: "Lorem ipsum dolor sit.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit quam.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde dicta quas.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde dicta quas.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    text: "Lorem ipsum dolor sit amet.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    text: "Lorem ipsum dolor sit.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit quam.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde dicta quas.",
  },
];

export default function ArticlePage() {
  const linkAnchorsListener = () => {
    const sections: NodeListOf<HTMLHeadingElement> | undefined = document
      .getElementById("main-article")
      ?.querySelectorAll("h3[id]");
    let currentSection: string | null = "";

    if (sections) {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 10) {
          currentSection = section.getAttribute("id");
        }
      });

      sections.forEach((section) => {
        const id = section.getAttribute("id");
        const link = document.querySelector(`a[href="#${id}"]`);
        if (id === currentSection) {
          link?.classList.add(
            "text-base-green",
            "hover:text-base-green-hover",
            "dark:text-dark-base-green",
            "dark:text-dark-base-green-hover"
          );
          link?.classList.remove(
            "text-base-neutral",
            "hover:text-base-green-hover",
            "dark:text-dark-base-neutral",
            "hover:dark:text-dark-base-green-hover"
          );
        } else {
          link?.classList.add(
            "text-base-neutral",
            "hover:text-base-green-hover",
            "dark:text-dark-base-neutral",
            "hover:dark:text-dark-base-green-hover"
          );
          link?.classList.remove(
            "text-base-green",
            "hover:text-base-green-hover",
            "dark:text-dark-base-green",
            "dark:text-dark-base-green-hover"
          );
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
    <main className="w-full h-full mx-0">
      <ArticleHero />
      <div className="w-full max-w-webpage mx-auto h-full flex gap-16 pb-16">
        <LinkAnchorTracker links={links} />
        <ArticleBody links={links} />
        <div className="h-full sticky top-1/2 -translate-y-1/2 mt-20">
          <BackToTopButton />
        </div>
      </div>
      <div className="max-w-webpage mx-auto h-full mb-20">
        <div className="w-[700px] ml-[414px]">
          <Tags />
        </div>
      </div>
      <RelatedArticles />
    </main>
  );
}
