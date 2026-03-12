// import Image from "next/image";
import { Avatar } from "../Avatar";
import { ArtBreadcrumb } from "./Breadcrumb";

export default function ArticleTitle() {
  return (
    <div className="w-full inline-grid">
      {/* <Image
        src="https://placehold.co/1920x1080/000000/FFFFFF/jpeg"
        alt=""
        width={1920}
        height={1080}
        className="lg:col-start-1 lg:row-start-1 lg:h-150 lg:object-cover w-full border-b dark:border-stone-800"
      /> */}
      <div className="[background-image:radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-180 w-full border-b dark:border-stone-800 aspect-video bg-cover" />
      <div className="lg:col-start-1 lg:row-start-1 lg:px-10 lg:mt-auto lg:mb-0 lg:pt-10 border-t lg:backdrop-blur-xl lg:bg-linear-to-t lg:from-background lg:to-background/25">
        <div className="w-full max-w-article-title p-6 pb-0 lg:mx-auto lg:px-10">
          <section className="col-start-2">
            <ArtBreadcrumb />
            <Title />
          </section>
        </div>
      </div>
      <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10">
        <Subtitle />
      </div>
      <div className="w-full bg-container border-y py-2">
        <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10">
          <div className="flex items-center gap-3 lg:gap-6">
            <Avatar />
            <div className="flex flex-col lg:hidden">
              <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
                Criado: <time>2-02-2026</time>
              </small>
              <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
                Atualizado: <time>17-02-2026</time>
              </small>
            </div>
            <div className="hidden lg:flex gap-3">
              <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
                Criado: <time>2 de fevereiro de 2026</time>
              </small>
              <small className="flex font-medium text-xs text-neutral-500 dark:text-neutral-500 md:flex-row gap-1">
                Atualizado: <time>17 de fevereiro de 2026</time>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-article-title px-6 lg:mx-auto lg:px-10">
        <div className="w-full h-px inline-grid">
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)]" />
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)] blur-sm" />
        </div>
      </div>
    </div>
  );
}

const Title = () => (
  <div className="pb-1 lg:pb-4 mb-1 lg:mb-4">
    <h1 className="text-3xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-100">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </h1>
  </div>
);

const Subtitle = () => (
  <div className="pb-1 lg:pb-4 mb-1 lg:mb-4">
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ipsum
      illum assumenda
    </p>
  </div>
);
