import Image from "next/image";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import Breadcrumbs from "../Breadcrumbs";

const ArticleHero = () => {
  return (
    <div id="article-hero" className="bg-base-200 dark:bg-dark-base-200">
      <div className="max-w-webpage mx-auto py-16">
        <div className="mx-20 opacity-0 translate-x-8 transition-all duration-300 animate-article-hero">
          <Breadcrumbs />
          <h1 className="text-base-neutral dark:text-dark-base-neutral font-extrabold text-5xl mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </h1>
          <h2 className="text-base-neutral dark:text-dark-base-neutral text-3xl font-[500] mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas a
            cum ea, nisi doloribus eaque enim ex ipsam inventore doloremque
            voluptatem quia alias perferendis illum totam deleniti
            necessitatibus quam. Modi.
          </h2>
          <div className="flex items-center gap-20">
            <button className="flex items-center gap-2 pr-3">
              <div className="relative size-10 rounded-full">
                <Image
                  src="/images/user-placeholder.png"
                  alt="Imagem de perfil do usuário"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl text-base-green dark:text-dark-base-green">
                Fulano de Tal
              </span>
            </button>
            <small className="flex items-center gap-2 text-base font-[700] text-base-neutral dark:text-dark-base-neutral">
              <FaClock /> 19/08/2024 às 21:43
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
