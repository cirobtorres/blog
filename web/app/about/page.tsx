import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

const ArticleBanner = ({
  bannerUrl,
  bannerAlt,
}: {
  bannerUrl: string;
  bannerAlt: string;
}) => (
  <div className="w-full inline-grid h-100">
    <img
      src={bannerUrl}
      alt={bannerAlt}
      width={1920}
      height={1080}
      className="col-start-1 row-start-1 h-full max-h-180 min-h-75 object-cover w-full border-b dark:border-stone-800"
    />
    <DarkenImage />
  </div>
);

const DarkenImage = () => (
  <div className="col-start-1 row-start-1 h-full max-h-180 min-h-75 w-full border-b dark:border-stone-800 bg-cover bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1))]" />
);

export default function AboutPage() {
  return (
    <div
      className="min-h-screen grid grid-rows-[1fr_var(--height-footer)]" // grid-rows-[var(--height-header)_1fr_var(--height-footer)]
    >
      <Header className="fixed" />
      <main className="mt-height-header">
        <ArticleBanner
          bannerUrl="https://www.blender.org/wp-content/uploads/2020/06/blender_283_social.jpg"
          bannerAlt=""
        />
        <div className="w-full max-w-300 mx-auto">
          <div className="flex flex-col px-6 my-6">
            <div className="mb-8">
              <h1>Quem sou eu</h1>
            </div>
            <div className="flex flex-col gap-8">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam quibusdam accusamus sequi, ea sit debitis odio quidem
                mollitia omnis laborum nemo aut illo beatae voluptatem eos culpa
                consequatur rem magnam! Eaque, vero excepturi fuga reiciendis
                nesciunt facilis nihil! Temporibus placeat impedit, qui sit aut
                asperiores debitis, harum laborum eius architecto deleniti
                facilis laboriosam et aliquid cum? Voluptas voluptatum natus
                quasi. Placeat incidunt ducimus illum! Illum aperiam repudiandae
                incidunt quasi maxime provident rerum magnam minima aliquam.
                Voluptatem tenetur vero itaque similique culpa at qui officia
                dolore, commodi, dolor, ipsum velit rerum. Esse vero nihil
                aliquam molestias placeat voluptate maxime doloribus est
                laudantium eligendi dolorum sapiente dolore quisquam aut in,
                nostrum voluptates amet hic consectetur illum error? Saepe alias
                pariatur ullam delectus.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus eveniet culpa saepe dolorem id maxime, corporis autem
                impedit deleniti aliquid facere consectetur beatae maiores
                magnam neque repellat vero fugiat quaerat dignissimos nulla
                fugit. Incidunt iusto quidem, inventore praesentium ad, corporis
                adipisci nulla veniam officiis reiciendis quae minus impedit,
                sunt quod. Aspernatur adipisci optio maxime saepe expedita
                voluptatum nisi, provident sapiente nemo. Delectus qui corporis
                unde sit aliquam nobis ipsum error iste. Fuga delectus iste
                velit suscipit? Laborum inventore fugiat, tempora, aliquam
                maiores possimus non corrupti, in qui mollitia quas obcaecati.
                Eaque debitis possimus rerum animi necessitatibus recusandae
                sed, at voluptates!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
