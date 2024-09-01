"use server";

import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import Breadcrumbs from "../Breadcrumbs";
import { createClient } from "../../utils/supabase/server";
import formatDate from "../../functions/formatDate";

const ArticleHero = async ({
  auth_users_id,
  title,
  sub_title,
  updated_at,
  created_at,
}: {
  auth_users_id: string;
  title: string;
  sub_title: string;
  updated_at: string;
  created_at: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.getUserById(auth_users_id);
  return (
    <div id="article-hero" className="bg-base-200 dark:bg-dark-base-200">
      <div className="max-w-webpage mx-auto py-16">
        <div className="w-full pl-[calc(280px_+_64px)] pr-[calc(64px_+_75px_+_64px)]">
          <Breadcrumbs />
          <h1 className="text-base-neutral dark:text-dark-base-neutral font-extrabold text-5xl mb-4">
            {title}
          </h1>
          <h2 className="text-base-neutral dark:text-dark-base-neutral text-3xl font-[500] mb-4">
            {sub_title}
          </h2>
          <div className="flex items-center gap-20">
            {data.user && (
              <button className="flex items-center gap-2 pr-3">
                <div className="relative size-10 rounded-full overflow-hidden">
                  <Image
                    src={
                      data.user.user_metadata.picture ||
                      "/images/user-placeholder.png"
                    }
                    alt={"Imagem de perfil de " + data.user.user_metadata.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="font-extrabold text-2xl text-base-green dark:text-dark-base-green">
                  {data.user.user_metadata.name}
                </span>
              </button>
            )}
            <small className="flex items-center gap-2 text-base font-[700] text-base-neutral dark:text-dark-base-neutral">
              <FaClock /> {formatDate(created_at)}
            </small>
            <Link
              href="#"
              className="flex items-center gap-2 font-[700] text-base-neutral dark:text-dark-base-neutral"
            >
              <IoIosChatbubbles className="text-2xl" /> 4
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;
