import Link from "next/link";

export default function Tags() {
  return (
    <>
      <h4 className="uppercase font-extrabold text-base-neutral dark:text-dark-base-neutral after:content-[':'] mb-2">
        Categorias
      </h4>
      <ul className="w-full flex flex-wrap items-center gap-2">
        <li className="text-sm italic text-base-neutral dark:text-dark-base-neutral hover:text-base-100">
          <Link
            href="/"
            className="leading-6 py-1 rounded hover:text-base-green dark:hover:text-dark-base-green-hover"
          >
            NextJS
          </Link>
        </li>
      </ul>
    </>
  );
}
