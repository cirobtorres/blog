"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { GoClock } from "react-icons/go";
import { PiChatsCircleThin } from "react-icons/pi";
import Breadcrumbs from "../../components/Breadcrumbs";
import ArticleCard from "../../components/ArticleCard";
import Tags from "../../components/Tags";

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
];

export default function ArticlePage() {
  const handleScroll = () => {
    window.addEventListener("scroll", () => {
      const sections: NodeListOf<HTMLHeadingElement> =
        document.querySelectorAll("section h3[id]");
      let currentSection: string | null = "";

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
          link?.classList.add("text-base-blue", "dark:text-dark-base-blue");
          link?.classList.remove(
            "text-base-neutral",
            "hover:text-base-blue-hover",
            "dark:text-dark-base-neutral",
            "hover:dark:text-dark-base-blue-hover"
          );
        } else {
          link?.classList.add(
            "text-base-neutral",
            "hover:text-base-blue-hover",
            "dark:text-dark-base-neutral",
            "hover:dark:text-dark-base-blue-hover"
          );
          link?.classList.remove("text-base-blue", "dark:text-dark-base-blue");
        }
      });
    });
  };

  useEffect(() => {
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className={`
      w-full h-full mx-0 
      before:content-[''] before:-z-[1] 
      before:fixed before:-left-full
      before:top-0 before:bottom-0 before:right-[calc(100%_-_610px)]
      before:bg-base-150 dark:before:bg-dark-base-150
    `}
    >
      <ArticleHero />
      <div className="w-full max-w-webpage mx-auto h-full flex gap-16 py-16">
        <JumpLinkTracker />
        <ArticleBody />
      </div>
      <TagsWrapper />
      <ArticlesRelated />
    </main>
  );
}

const ArticleHero = () => {
  return (
    <div className="bg-base-200 dark:bg-dark-base-200">
      <div className={`max-w-webpage mx-auto py-16`}>
        <div className="mx-20">
          <Breadcrumbs />
          <h1 className="text-base-neutral dark:text-dark-base-neutral font-extrabold text-5xl mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </h1>
          <h2 className="text-base-neutral dark:text-dark-base-neutral text-xl font-[500] mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas a
            cum ea, nisi doloribus eaque enim ex ipsam inventore doloremque
            voluptatem quia alias perferendis illum totam deleniti
            necessitatibus quam. Modi.
          </h2>
          <div className="flex items-center gap-20">
            <button className="flex items-center gap-2 bg-base-blue dark:bg-dark-base-blue p-2 pr-3 rounded-full">
              <div className="relative size-12 rounded-full">
                <Image
                  src="/images/user-placeholder.png"
                  alt="Imagem de perfil do usuário"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl text-base-neutral dark:text-dark-base-100">
                Fulano
              </span>
            </button>
            <small className="flex items-center gap-2 text-base font-[700] text-base-neutral dark:text-dark-base-neutral">
              <GoClock /> 19/08/2024 21:43
            </small>
            <Link
              href="#"
              className="flex items-center gap-2 font-[700] text-base-neutral dark:text-dark-base-neutral"
            >
              <PiChatsCircleThin className="text-2xl" /> 4
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const JumpLinkTracker = () => {
  return (
    <nav className="w-[350px] flex-shrink-0 h-full sticky top-20 mt-20 bg-base-200 dark:bg-dark-base-300">
      <ul className="text-right">
        <h2 className="font-extrabold text-2xl p-6 text-base-neutral dark:text-dark-base-neutral">
          Conteúdo
        </h2>
        <div className="h-full max-h-[70vh] overflow-auto scrollbar px-6 pb-6">
          {links.map((link, index) => (
            <li key={index} className="mb-1">
              <Link
                href={`#anchor-${index + 1}`}
                className="text-sm text-base-neutral dark:text-dark-base-neutral hover:text-base-blue-hover hover:dark:text-dark-base-blue-hover"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

const ArticleBody = () => {
  return (
    <article className="w-full">
      <section className="pr-20">
        {Array.from({ length: links.length }, (_, index) => (
          <div key={index}>
            <h3
              id={`anchor-${index + 1}`}
              className="pt-20 font-extrabold text-4xl mb-6 text-base-neutral dark:text-dark-base-neutral"
            >
              {links[index].text}
            </h3>
            <p className="text-xl text-base-neutral dark:text-dark-base-neutral">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad facere
              repellat adipisci earum, beatae, consequatur vitae quas, atque eum
              molestias omnis illo iusto explicabo eveniet facilis asperiores
              numquam impedit. Minus. Perferendis architecto numquam
              necessitatibus veritatis. Saepe libero tempora recusandae vel.
              Doloribus quos, explicabo atque tempore quod odit fugit quo illo
              suscipit consectetur minus rerum nostrum et neque vero facere
              placeat. Nostrum laborum corporis optio harum earum at vitae
              asperiores numquam. Sunt dolor quibusdam maxime facilis? Illum eum
              vitae esse dicta doloremque, autem, sunt sequi cupiditate earum
              corrupti est ad recusandae. In nesciunt provident eligendi
              sapiente mollitia temporibus recusandae quidem accusantium
              corporis at explicabo debitis facilis molestias, suscipit
              laboriosam nemo quas nisi veniam doloribus veritatis? Doloremque
              ipsam vitae pariatur quo cum. Modi, pariatur nemo. Unde, obcaecati
              aspernatur! Cumque sed dicta aspernatur vitae minima, at eveniet
              eius vel dignissimos ducimus distinctio. Impedit quos ab illum
              saepe unde corporis fugit aspernatur officia non! Impedit
              voluptates consequatur voluptas perspiciatis dignissimos facere
              obcaecati ipsum inventore alias velit quam totam ipsam soluta
              tempore omnis sint, iste dicta illum excepturi accusamus. Dolorum
              consequatur molestiae exercitationem doloribus obcaecati?
              Voluptatem illum assumenda eius dolores iste facere repellat.
              Explicabo consequatur aliquam, nisi animi ducimus similique
              quaerat cum at dolore! Commodi laudantium distinctio culpa aperiam
              ipsum quas, tenetur facere dolores modi? Iusto commodi ipsum unde
              officia consequuntur quidem odit molestiae porro modi inventore
              excepturi voluptate dolorem rem facere perferendis ullam neque, ab
              consequatur quo eligendi reiciendis aspernatur corporis natus?
              Rem, aspernatur. Perspiciatis quod veniam ad itaque excepturi.
              Consequuntur deserunt cumque incidunt odit amet delectus quis
              inventore porro quasi itaque fugiat doloremque ipsum vero illum
              expedita, culpa aliquid debitis velit voluptatum laudantium. Quae
              fugiat illo ut dolores expedita consequuntur excepturi earum
              veritatis. Dolorum, temporibus aspernatur eveniet esse totam velit
              nisi modi dicta eligendi perferendis. Obcaecati asperiores
              voluptas iusto necessitatibus eum dicta tenetur.
            </p>
            <br />
          </div>
        ))}
      </section>
    </article>
  );
};

const TagsWrapper = () => {
  return (
    <div className="max-w-webpage mx-auto h-full mb-20">
      <div className="w-[700px] ml-[414px]">
        <Tags />
      </div>
    </div>
  );
};

const ArticlesRelated = () => {
  return (
    <section className="bg-base-150">
      <div className="w-full max-w-webpage mx-auto py-8">
        <div className="bg-base-200 p-8">
          <h2 className="uppercase font-extrabold text-2xl text-base-neutral">
            Outros artigos relacionados
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 m-16">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>
    </section>
  );
};
