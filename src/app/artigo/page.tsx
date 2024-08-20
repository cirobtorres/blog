"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import { PiChatsCircleThin } from "react-icons/pi";
import Breadcrumbs from "../../components/Breadcrumbs";

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
    text: "Lorem ipsum dolor.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit quam.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde dicta quas.",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function ArticlePage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    console.log("Renderizei");
    const handleScroll = () => {
      const sections: NodeListOf<HTMLHeadingElement> =
        document.querySelectorAll("h2[id]");
      let currentSection: string | null = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 10) {
          currentSection = section.getAttribute("id");
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <main className="w-full h-full mx-0 before:content-[''] before:-z-[1] before:fixed before:-left-full before:bottom-0 before:top-0 before:right-[calc(100%_-_610px)] before:bg-base-200 dark:before:bg-dark-base-200">
      <div className="bg-base-300 dark:bg-dark-base-300">
        <div className="relative w-full h-[600px]">
          <Image
            src="/images/coding-language-1920x1080.jpg"
            alt="exemplo"
            fill
            className="object-cover"
          />
        </div>
        <div className={`pl-[416px] max-w-webpage mx-auto py-16`}>
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
            <button className="flex items-center gap-2 bg-base-200 dark:bg-dark-base-200 p-2 pr-3 rounded-full">
              <div className="relative size-12 rounded-full">
                <Image
                  src="/images/user-placeholder.png"
                  alt="Imagem de perfil do usuário"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl text-base-neutral dark:text-dark-base-neutral">
                Fulano
              </span>
            </button>
            <small className="flex items-center gap-2 text-base text-base-neutral dark:text-dark-base-neutral">
              <GoClock /> 19/08/2024 21:43
            </small>
            <Link
              href="#"
              className="flex items-center gap-2 text-base-neutral dark:text-dark-base-neutral"
            >
              <PiChatsCircleThin className="text-2xl" /> 4
            </Link>
          </div>
        </div>
      </div>
      <section className="w-full max-w-webpage mx-auto h-full flex gap-16 py-16">
        <nav className="w-[350px] flex-shrink-0 h-full sticky top-28 p-6 rounded-3xl bg-base-300 dark:bg-dark-base-300">
          <ul>
            <h2 className="font-extrabold mb-4 text-2xl text-base-neutral dark:text-dark-base-neutral">
              Conteúdo
            </h2>
            {links.map((link, index) => (
              <li key={index} className="mb-1">
                <Link
                  href={`#anchor-${index + 1}`}
                  aria-current={activeSection === `anchor-${index + 1}`}
                  className={`${
                    activeSection === `anchor-${index + 1}`
                      ? "text-base-blue dark:text-dark-base-blue"
                      : "text-base-neutral hover:text-base-blue-hover dark:text-dark-base-neutral hover:dark:text-dark-base-blue-hover"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article className="flex-grow">
          {Array.from({ length: 10 }, (_, index) => (
            <section key={index}>
              <h2
                id={`anchor-${index + 1}`}
                className="font-extrabold text-4xl mb-6"
              >
                Hello World
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                facere repellat adipisci earum, beatae, consequatur vitae quas,
                atque eum molestias omnis illo iusto explicabo eveniet facilis
                asperiores numquam impedit. Minus. Perferendis architecto
                numquam necessitatibus veritatis. Saepe libero tempora
                recusandae vel. Doloribus quos, explicabo atque tempore quod
                odit fugit quo illo suscipit consectetur minus rerum nostrum et
                neque vero facere placeat. Nostrum laborum corporis optio harum
                earum at vitae asperiores numquam. Sunt dolor quibusdam maxime
                facilis? Illum eum vitae esse dicta doloremque, autem, sunt
                sequi cupiditate earum corrupti est ad recusandae. In nesciunt
                provident eligendi sapiente mollitia temporibus recusandae
                quidem accusantium corporis at explicabo debitis facilis
                molestias, suscipit laboriosam nemo quas nisi veniam doloribus
                veritatis? Doloremque ipsam vitae pariatur quo cum. Modi,
                pariatur nemo. Unde, obcaecati aspernatur! Cumque sed dicta
                aspernatur vitae minima, at eveniet eius vel dignissimos ducimus
                distinctio. Impedit quos ab illum saepe unde corporis fugit
                aspernatur officia non! Impedit voluptates consequatur voluptas
                perspiciatis dignissimos facere obcaecati ipsum inventore alias
                velit quam totam ipsam soluta tempore omnis sint, iste dicta
                illum excepturi accusamus. Dolorum consequatur molestiae
                exercitationem doloribus obcaecati? Voluptatem illum assumenda
                eius dolores iste facere repellat. Explicabo consequatur
                aliquam, nisi animi ducimus similique quaerat cum at dolore!
                Commodi laudantium distinctio culpa aperiam ipsum quas, tenetur
                facere dolores modi? Iusto commodi ipsum unde officia
                consequuntur quidem odit molestiae porro modi inventore
                excepturi voluptate dolorem rem facere perferendis ullam neque,
                ab consequatur quo eligendi reiciendis aspernatur corporis
                natus? Rem, aspernatur. Perspiciatis quod veniam ad itaque
                excepturi. Consequuntur deserunt cumque incidunt odit amet
                delectus quis inventore porro quasi itaque fugiat doloremque
                ipsum vero illum expedita, culpa aliquid debitis velit
                voluptatum laudantium. Quae fugiat illo ut dolores expedita
                consequuntur excepturi earum veritatis. Dolorum, temporibus
                aspernatur eveniet esse totam velit nisi modi dicta eligendi
                perferendis. Obcaecati asperiores voluptas iusto necessitatibus
                eum dicta tenetur.
              </p>
              <br />
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}
