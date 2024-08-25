import { IoSearch, IoClose } from "react-icons/io5";

export default function Search() {
  return (
    <form className="relative mx-auto w-full shadow-md max-w-3xl min-w-xl h-16 rounded-full overflow-hidden bg-base-150 dark:bg-dark-base-150">
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2 left-6 hover:text-base-green dark:hover:text-dark-base-green text-xl text-base-neutral dark:text-dark-base-neutral"
      >
        <IoSearch />
      </button>
      <input
        type="search"
        placeholder="Pesquise tópicos antigos"
        className="w-full h-full px-16 text-base-neutral dark:text-dark-base-neutral border-none outline-none bg-transparent"
      />
      <button
        type="reset"
        className="absolute top-1/2 -translate-y-1/2 right-6 hover:text-base-red dark:hover:text-dark-base-red text-xl text-base-neutral dark:text-dark-base-neutral"
      >
        <IoClose />
      </button>
    </form>
  );
}
