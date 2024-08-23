import Image from "next/image";
import Link from "next/link";

export default function ArticleCard() {
  return (
    <article className="w-full h-full min-h-96 shadow-xl overflow-hidden transition-transform bg-base-100 hover:-translate-y-2">
      <Link href="/artigo" className="w-full h-full">
        <div className="relative w-full h-1/2">
          <Image
            src="https://placehold.co/1920x1080/png"
            alt="exemplo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 h-1/2 p-4">
          <span>Javascript</span>
          <h2 className="text-base-neutral font-extrabold uppercase">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus, sapiente accusantium?
          </h2>
          <span className="mt-auto mb-0 text-xs">02-04-2024</span>
        </div>
      </Link>
    </article>
  );
}
