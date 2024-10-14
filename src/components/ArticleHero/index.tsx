"use server";

import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { createClient } from "@/utils/supabase/server";
import { formatDate } from "@/functions/formatDate";
import Breadcrumbs from "../Breadcrumbs";

const ArticleHero = async ({
  blog_author_id,
  title,
  sub_title,
  updated_at,
  created_at,
}: {
  blog_author_id: string;
  title: string;
  sub_title: string;
  updated_at: string;
  created_at: string;
}) => {
  const supabase = createClient();
  const { data: blogUser } = await supabase
    .from("blog_author")
    .select("*")
    .eq("id", blog_author_id)
    .single();
  const { data } = await supabase.auth.admin.getUserById(
    blogUser.auth_users_id
  );
  return (
    <section id="article-hero" className="bg-base-200 dark:bg-dark-base-200">
      <div className="mx-4 smartphone:mx-10 tablet:mx-20">
        <div className="max-w-webpage mx-auto pb-5 pt-3 smartphone:pb-9 smartphone:pt-7 tablet:pb-16 tablet:pt-12">
          <div className="grid grid-cols-[minmax(300px,1fr)] tablet:gap-8 tablet:grid-cols-[minmax(180px,250px)_minmax(300px,1fr)] xl:gap-16 xl:grid-cols-[minmax(180px,250px)_minmax(300px,1fr)_75px]">
            <section className="col-start-1 tablet:col-start-2">
              <Breadcrumbs />
              <h1 className="text-base-neutral dark:text-dark-base-neutral font-extrabold text-3xl smartphone:text-4xl tablet:text-5xl mb-2 smartphone:mb-3 tablet:mb-4">
                {title}
              </h1>
              <h2 className="text-base-neutral dark:text-dark-base-neutral text-xl smartphone:text-2xl tablet:text-3xl font-[500] mb-2 smartphone:mb-3 tablet:mb-4">
                {sub_title}
              </h2>
              <div className="flex items-center gap-3 smartphone:gap-6 tablet:gap-12">
                <button className="flex items-center gap-1 smartphone:gap-2">
                  <div className="relative size-7 smartphone:size-9 tablet:size-10 rounded-full overflow-hidden">
                    <Image
                      src={
                        data.user?.user_metadata.picture ||
                        "/images/user-placeholder.png"
                      }
                      alt={
                        "Imagem de perfil de " +
                          data.user?.user_metadata.name || "unknown"
                      }
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-extrabold text-base smartphone:text-xl tablet:text-2xl text-base-green dark:text-dark-base-green">
                    {data.user?.user_metadata.name || "unknown"}
                  </span>
                </button>
                <div className="flex flex-col">
                  <small className="flex flex-nowrap items-center gap-1 smartphone:gap-2 text-xs tablet:text-sm font-[700] text-base-neutral dark:text-dark-base-neutral">
                    Criado: {formatDate(created_at)}
                  </small>
                  <small className="flex flex-nowrap items-center gap-1 smartphone:gap-2 text-xs tablet:text-sm font-[700] text-base-neutral dark:text-dark-base-neutral">
                    Atualizado: {formatDate(updated_at)}
                  </small>
                </div>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-xs smartphone:text-sm font-[700] text-base-neutral dark:text-dark-base-neutral"
                >
                  <IoIosChatbubbles className="text-base smartphone:text-lg" />{" "}
                  4
                </Link>
                <button className="flex items-center gap-2 text-xs smartphone:text-sm font-[700] text-base-neutral dark:text-dark-base-neutral">
                  <GoHeart className="text-base smartphone:text-lg" />
                  {/* <GoHeartFill className="text-lg smartphone:text-xl tablet:text-2xl" /> */}
                  6
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
