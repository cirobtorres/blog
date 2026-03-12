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
        className="col-start-1 row-start-1 w-full h-150 object-cover" // border-b
      /> */}
      <div className="[background-image:radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,1)),url('https://techgage.com/wp-content/uploads/2022/09/Blender-3.3-with-OneAPI-and-Intel-Arc-GPU.jpg')] lg:col-start-1 lg:row-start-1 lg:h-150 w-full border-b dark:border-stone-800 aspect-video bg-cover" />
      <div className="lg:col-start-1 lg:row-start-1 w-full max-w-article-title p-6 lg:border lg:border-b-0 lg:dark:border-stone-800 lg:m-auto lg:mb-0 lg:p-10 lg:pb-0 lg:rounded-t-4xl lg:bg-linear-to-t lg:from-10% lg:from-stone-100 lg:to-stone-100/50 lg:dark:from-stone-925 lg:dark:to-stone-925/50 lg:backdrop-blur-2xl">
        <section className="col-start-2">
          <ArtBreadcrumb />
          <Title />
        </section>
      </div>
      <div className="w-full max-w-article-title mx-auto lg:px-10">
        <Subtitle />
        <div className="flex items-center gap-6">
          <Avatar />
          <small className="flex flex-col font-medium text-neutral-500 dark:text-neutral-500 md:flex-row md:gap-6">
            <time>2 de fevereiro de 2026, às 10:53</time>
            <time>17 de fevereiro de 2026, às 19:22</time>
          </small>
        </div>
        <div className="w-full h-px inline-grid">
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_5%,var(--color-primary)_75%,transparent_100%)]" />
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_5%,var(--color-primary)_75%,transparent_100%)] blur-sm" />
        </div>
      </div>
    </div>
  );
}

const Title = () => (
  <div className="pb-4 mb-4">
    <h1 className="text-3xl lg:text-5xl font-semibold text-neutral-900 dark:text-neutral-100">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </h1>
  </div>
);

const Subtitle = () => (
  <div className="lg:pb-4 lg:mb-4">
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-500 dark:text-neutral-400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ipsum
      illum assumenda
    </p>
  </div>
);
