import Image from "next/image";
import { Button } from "../../../components/Buttons";
import { Checkbox } from "../../../components/Fieldset/Checkbox";
import { cn } from "../../../utils/variants";

export default async function AuthorsMediaPage() {
  return (
    <div className="w-full max-w-6xl ml-0 mr-auto min-[1536px]:mx-auto justify-self-center flex-1 flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-extrabold my-6">Biblioteca de Media</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <Button variant="link" className="w-full max-w-40 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Criar pasta
          </Button>
          <Button className="w-full max-w-40 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Adicionar assets
          </Button>
        </div>
      </div>
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">Folders &#40;7&#41;</h2>
        <div className="w-full grid grid-cols-4 items-center gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <label
              key={index}
              htmlFor={"folder-" + index}
              className="w-full flex-1 flex shrink-0 items-center gap-2 py-2 px-3 transition-border duration-300 rounded border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-850 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850"
            >
              <Checkbox id={"folder-" + index} />
              <div className="rounded-lg p-3 border dark:border-stone-825 bg-stone-400 dark:bg-stone-925">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="fill-stone-400 stroke-stone-400"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-neutral-100">Nome</p>
                <p className="text-xs text-nowrap text-neutral-400">
                  0 folder, 1 asset
                </p>
              </div>
            </label>
          ))}
        </div>
      </section>
      <hr className="dark:border-stone-800" />
      <section className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl">Assets &#40;6&#41;</h2>

        <div className="flex items-center gap-2">
          <label htmlFor="">
            <Checkbox id="" className="size-6" />
          </label>
          <Button variant="link" className="h-8">
            Mais recentes{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
          <Button variant="link" className="h-8">
            Filtros{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="M2 5h20" />
              <path d="M6 12h12" />
              <path d="M9 19h6" />
            </svg>
          </Button>
        </div>
        <Button variant="destructive" className="h-8 w-full max-w-30">
          Excluir
        </Button>
        <div className="w-full grid grid-cols-3 items-center gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <article
              key={index}
              className="w-full max-w-100 h-60 flex flex-col shrink-0 items-center overflow-hidden transition-border duration-300 rounded-lg border hover:border-primary not-dark:shadow bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-850 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-stone-300 dark:has-data-[state=checked]:bg-stone-850 focus-within:border-primary dark:focus-within:border-primary group"
            >
              <div className="w-full h-full grid grid-rows-[1fr_80px]">
                <div className="relative">
                  <label
                    htmlFor={"card-" + index}
                    className="relative w-full h-full overflow-hidden"
                  >
                    <HazardBorder />
                    <Checkbox
                      id={"card-" + index}
                      className="absolute z-10 size-6 rounded left-2 top-2"
                    />
                    <Image
                      src="https://placehold.co/1600x1080/000/fff/jpeg"
                      alt={"Imagem placeholder de exp" + index}
                      fill
                      className="absolute object-contain"
                    />
                  </label>
                  <div className="absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-has-data-[state=checked]:opacity-100">
                    <Button variant="outline" className="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=""
                      >
                        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=""
                      >
                        <path d="M12 15V3" />
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <path d="m7 10 5 5 5-5" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=""
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="size-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className=""
                      >
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs leading-4 line-clamp-2 text-neutral-900 dark:text-neutral-100">
                      lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-Minima-sequi-dolor-illum-incidunt-aliquid-enim
                    </span>
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-xs font-bold text-neutral-500">
                        JPEG - 1920x1080
                      </span>
                      <span className="text-xs px-2 py-1 rounded font-bold transition-[colors,background-color] duration-300 dark:text-neutral-500 dark:bg-stone-800 dark:group-hover:bg-stone-750 dark:group-has-data-[state=checked]:bg-stone-750">
                        IMG
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

const HazardBorder = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-full shrink-0 bg-fixed bg-[repeating-linear-gradient(315deg,#292524_0,#292524_1px,transparent_0,transparent_50%)] bg-size-[10px_10px]",
        className,
      )}
    />
  );
};
