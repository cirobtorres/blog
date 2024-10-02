"use server";

import { FaCss3Alt, FaHtml5, FaJava, FaPython } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { BiLogoMongodb } from "react-icons/bi";
import { SiNestjs } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { RiSupabaseFill } from "react-icons/ri";
import { createClient } from "@/utils/supabase/server";
import { TagCreate } from "@/components/TagForms";

export default async function TagsPage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <section className="pl-20 tablet:pl-6 pr-10 tablet:px-20 px-10 py-6">
      <div className="border-b border-base-border dark:border-dark-base-border pb-2 mb-2">
        <h1 className="text-3xl uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral">
          Tags
        </h1>
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-base-neutral dark:text-dark-base-neutral">
          Criar tag
        </h2>
      </div>
      {user && <TagCreate user={user} />}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-base-neutral dark:text-dark-base-neutral">
            Lista de tags
          </h2>
        </div>
        {tags && (
          <ul className="flex-wrap flex items-center gap-1">
            {tags.map((tag, index) => (
              <li key={tag.id}>
                <button
                  type="button"
                  className="w-fit text-sm italic px-2 rounded transition-all duration-300 text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#fff]"
                >
                  {tag.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
