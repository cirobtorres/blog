import { IoSearch, IoClose } from "react-icons/io5";

export default function Search() {
  return (
    <form className="relative w-full max-w-md h-8 rounded overflow-hidden transition-[outline] duration-200 outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 border border-base-200 dark:border-dark-base-border bg-base-100 dark:bg-dark-base-150">
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2 left-2 hover:text-base-green dark:hover:text-dark-base-green text-sm text-base-neutral dark:text-dark-base-neutral"
      >
        <IoSearch />
      </button>
      <input
        type="search"
        placeholder="Pesquise artigos"
        className="w-full h-full px-7 pt-1 pb-1.5 flex items-center text-xs placeholder:text-xs placeholder:text-dark-base-placeholder text-base-neutral dark:text-dark-base-neutral border-none outline-none bg-transparent"
      />
      <button
        type="reset"
        className="absolute top-1/2 -translate-y-1/2 right-2 hover:text-base-red dark:hover:text-dark-base-red text-sm text-base-neutral dark:text-dark-base-neutral"
      >
        <IoClose />
      </button>
    </form>
  );
}
