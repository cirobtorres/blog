import Image from "next/image";
import Link from "next/link";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { FaPython, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";

export default function ArticleCard() {
  return (
    <article className="w-full h-[500px] shadow-md overflow-hidden transition-transform hover:-translate-y-2 bg-base-100 dark:bg-[#2a2e35]">
      <Link href="/artigo/exemplo-de-artigo" className="w-full h-full">
        <div className="relative w-full h-1/2">
          <Image
            src="https://placehold.co/1920x1080/png"
            alt="exemplo"
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 h-1/2 p-4">
          <div className="flex gap-1">
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-yellow dark:bg-dark-base-yellow">
              Javascript
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-blue dark:bg-dark-base-blue">
              Python
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-purple dark:bg-dark-base-purple">
              HTML
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-pink dark:bg-dark-base-pink">
              CSS
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-red dark:bg-dark-base-red">
              Java
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-green dark:bg-dark-base-green">
              Java
            </span>
            <span className="text-xs px-1 py-0.5 rounded-lg text-base-neutral dark:text-white bg-base-neutral dark:bg-[#4d4d4d]">
              NextJS
            </span>
          </div>
          <h2 className="text-base font-extrabold uppercase text-base-neutral dark:text-dark-base-neutral">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h2>
          <p className="text-sm font-[500] text-base-neutral dark:text-dark-base-neutral">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            at voluptas unde sit architecto? Quos!
          </p>
          <span className="mt-auto mb-0 font-[500] text-base-neutral dark:text-dark-base-neutral text-xs">
            02-04-2024
          </span>
        </div>
      </Link>
    </article>
  );
}

export const InlineArticleCard = () => {
  return (
    <article className="w-full h-[180px] shadow-md overflow-hidden bg-base-100 dark:bg-[#2a2e35]">
      <Link href="/artigo/exemplo-de-artigo" className="flex w-full h-full">
        <div className="relative w-1/2">
          <Image
            src="https://placehold.co/1920x1080/png"
            alt="exemplo"
            fill
            sizes="180px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 w-1/2 p-3">
          <div className="flex gap-1">
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-yellow dark:bg-dark-base-yellow">
              <IoLogoJavascript />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-blue dark:bg-dark-base-blue">
              <FaPython />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-purple dark:bg-dark-base-purple">
              <FaHtml5 />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-pink dark:bg-dark-base-pink">
              <FaCss3Alt />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-red dark:bg-dark-base-red">
              <FaJava />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-red dark:bg-dark-base-red">
              <SiTailwindcss />
            </span>
            <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white bg-base-neutral dark:bg-[#272727]">
              <SiNextdotjs />
            </span>
          </div>
          <h2 className="text-xs font-extrabold uppercase leading-4 line-clamp-2 text-base-neutral dark:text-dark-base-neutral">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h2>
          <p className="text-xs font-[500] leading-2 line-clamp-2 text-base-neutral dark:text-dark-base-neutral">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            at voluptas unde sit architecto? Quos!
          </p>
          <span className="mt-auto mb-0 font-[500] text-base-neutral dark:text-dark-base-neutral text-xs">
            02-04-2024
          </span>
        </div>
      </Link>
    </article>
  );
};
