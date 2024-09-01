"use server";

import Link from "next/link";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { FaPython, FaJava, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io";
import { createClient } from "../../utils/supabase/server";

export default async function ArticleCard({
  id,
  slug,
  title,
  sub_title,
  body,
}: {
  id: string;
  slug: string;
  title: string;
  sub_title: string;
  body: string;
}) {
  const supabase = createClient();

  return (
    <Link href={`/artigos/${slug}/${id}`} className="group">
      <article
        className="rounded-2xl w-full overflow-hidden hover:shadow-md hover:bg-base-150 dark:hover:dark:bg-[#2a2e35]" // transition-transform hover:-translate-y-2
      >
        <div className="flex flex-col h-1/2 p-4">
          <h2 className="truncate text-base font-extrabold uppercase text-base-green dark:text-dark-base-green mb-2">
            {title}
          </h2>
          <h3 className="truncate text-sm font-extrabold text-base-neutral dark:text-dark-base-neutral mb-2">
            {sub_title}
          </h3>
          {/* {(data || !error) && <CategoryTag tag={data} />} */}
          <p
            dangerouslySetInnerHTML={{ __html: body }}
            className="line-clamp-3 text-xs text-base-neutral dark:text-dark-base-neutral [&_h3]:normal-case [&_h3]:mb-2"
          />
          <span className="flex items-center gap-1 text-sm font-[500] text-base-blue dark:text-dark-base-blue mt-2">
            Saiba mais
            <MdKeyboardArrowRight className="transition-all duration-300 text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
          </span>
        </div>
      </article>
    </Link>
  );
}

const CategoryTag = ({ tag }: { tag: any[] }) => {
  const mountTagComponent = (id: string, tagArray: string) => {
    switch (tagArray) {
      case "javascript":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white bg-base-yellow dark:bg-dark-base-yellow"
          >
            <IoLogoJavascript />
          </span>
        );
      case "python":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white bg-base-blue dark:bg-dark-base-blue"
          >
            <FaPython />
          </span>
        );
      case "html":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white bg-base-purple dark:bg-dark-base-purple"
          >
            <FaHtml5 />
          </span>
        );
      case "css":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white bg-base-pink dark:bg-dark-base-pink"
          >
            <FaCss3Alt />
          </span>
        );
      case "java":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white bg-base-red dark:bg-dark-base-red"
          >
            <FaJava />
          </span>
        );
      case "tailwind":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-white blue-500 dark:bg-blue-500"
          >
            <SiTailwindcss />
          </span>
        );
      case "nextjs":
        return (
          <span
            key={id}
            className="text-base p-1 rounded-lg text-base-neutral dark:text-[#272727] bg-base-100 flex justify-center items-center"
          >
            <SiNextdotjs />
          </span>
        );
    }
  };
  return (
    <div className="flex gap-1">
      {tag.map(({ id, title }) => mountTagComponent(id, title))}
    </div>
  );
};
