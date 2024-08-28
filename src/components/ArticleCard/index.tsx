import Image from "next/image";
import Link from "next/link";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { FaPython, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io";

export default function ArticleCard({
  id,
  title,
  subtitle,
  body,
}: {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <Link href={`/artigos/${title}/${id}`} className="group">
      <article
        className="rounded-2xl w-full overflow-hidden hover:shadow-md hover:bg-base-150 dark:hover:dark:bg-[#2a2e35]" // transition-transform hover:-translate-y-2
      >
        <div className="flex flex-col gap-4 h-1/2 p-4">
          <h2 className="text-base font-extrabold uppercase text-base-green dark:text-dark-base-green">
            {title}
          </h2>
          <h3 className="text-sm font-[500] text-base-neutral dark:text-dark-base-neutral">
            {subtitle}
          </h3>
          <LongArticleTags />
          {/* <ShortArticleTags /> */}
          <p className="line-clamp-3 text-xs text-base-neutral dark:text-dark-base-neutral">
            {body}
          </p>
          <span className="flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue">
            Saiba mais
            <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
          </span>
        </div>
      </article>
    </Link>
  );
}

export const InlineArticleCard = ({
  id,
  title,
  subtitle,
  body,
}: {
  id: string;
  title: string;
  subtitle: string;
  body: string;
}) => {
  return (
    <article className="w-full h-[180px] shadow-md overflow-hidden bg-base-100 dark:bg-[#2a2e35]">
      <Link href={`/artigos/${title}/${id}`} className="flex w-full h-full">
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
          <ShortArticleTags />
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

const LongArticleTags = () => {
  return (
    <div className="flex gap-1">
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-yellow dark:bg-dark-base-yellow">
        Javascript
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-blue dark:bg-dark-base-blue">
        Python
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-purple dark:bg-dark-base-purple">
        HTML
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-pink dark:bg-dark-base-pink">
        CSS
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-red dark:bg-dark-base-red">
        Java
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-green dark:bg-dark-base-green">
        SQL
      </span>
      <span className="text-xs px-1 py-0.5 rounded-lg text-base-100 bg-base-neutral dark:bg-[#4d4d4d]">
        NextJS
      </span>
    </div>
  );
};

const ShortArticleTags = () => {
  return (
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
      <span className="text-xs p-1 rounded-lg text-base-neutral dark:text-white blue-500 dark:bg-blue-500">
        <SiTailwindcss />
      </span>
      <span className="flex justify-center items-center text-lg text-base-neutral rounded-lg dark:text-[#272727] bg-base-100">
        <SiNextdotjs />
      </span>
    </div>
  );
};
