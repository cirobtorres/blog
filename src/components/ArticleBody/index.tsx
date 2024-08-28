import Link from "next/link";

const ArticleBody = ({ links }: { links: { text: string }[] }) => {
  return (
    <div
      id="main-article"
      className="w-full opacity-0 translate-y-20 transition-all duration-300 animate-jump-link-tracker"
    >
      <section className="pr-20">
        {Array.from({ length: links.length }, (_, index) => (
          <div key={index}>
            <h3
              id={`anchor-${index + 1}`}
              className="pt-16 font-extrabold text-3xl mb-6 text-base-neutral dark:text-dark-base-neutral"
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
              asperiores numquam.{" "}
              <Link
                href="#"
                className="font-extrabold text-base-green hover:text-base-green-hover dark:text-dark-base-green dark:hover:text-dark-base-green-hover"
              >
                Sunt dolor quibusdam
              </Link>{" "}
              maxime facilis? Illum eum vitae esse dicta doloremque, autem, sunt
              sequi cupiditate earum corrupti est ad recusandae. In nesciunt
              provident eligendi sapiente mollitia temporibus recusandae quidem
              accusantium corporis at explicabo debitis facilis molestias,
              suscipit laboriosam nemo quas nisi veniam doloribus veritatis?
              Doloremque ipsam vitae pariatur quo cum. Modi, pariatur nemo.
              Unde, obcaecati aspernatur! Cumque sed dicta aspernatur vitae
              minima, at eveniet eius vel dignissimos ducimus distinctio.
            </p>
            <p className="text-xl text-base-neutral dark:text-dark-base-neutral">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              consectetur quibusdam sequi veniam provident placeat quis labore
              quae eaque nesciunt. Impedit quos ab illum saepe unde corporis
              fugit aspernatur officia non! Impedit voluptates consequatur
              voluptas perspiciatis dignissimos facere obcaecati ipsum inventore
              alias velit quam totam ipsam soluta tempore omnis sint, iste dicta
              illum excepturi accusamus.
            </p>
            <p className="text-xl text-base-neutral dark:text-dark-base-neutral">
              Dolorum consequatur molestiae exercitationem doloribus obcaecati?
              Voluptatem illum assumenda eius dolores iste facere repellat.
              Explicabo consequatur aliquam, nisi animi ducimus similique
              quaerat cum at dolore! Commodi laudantium distinctio culpa aperiam
              ipsum quas,{" "}
              <Link
                href="#"
                className="font-extrabold text-base-green hover:text-base-green-hover dark:text-dark-base-green dark:hover:text-dark-base-green-hover"
              >
                tenetur facere dolores modi?
              </Link>{" "}
              Iusto commodi ipsum unde officia consequuntur quidem odit
              molestiae porro modi inventore excepturi voluptate dolorem rem
              facere perferendis ullam neque, ab consequatur quo eligendi
              reiciendis aspernatur corporis natus? Rem, aspernatur.
              Perspiciatis quod veniam ad itaque excepturi. Consequuntur
              deserunt cumque incidunt odit amet delectus quis inventore porro
              quasi itaque fugiat doloremque ipsum vero illum expedita, culpa
              aliquid debitis velit voluptatum laudantium. Quae fugiat illo ut
              dolores expedita consequuntur excepturi earum veritatis. Dolorum,
              temporibus aspernatur eveniet esse totam velit nisi modi dicta
              eligendi perferendis. Obcaecati asperiores voluptas iusto
              necessitatibus eum dicta tenetur.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ArticleBody;
