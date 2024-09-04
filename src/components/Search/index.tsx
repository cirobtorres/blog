import { IoSearch, IoClose } from "react-icons/io5";

export default function Search() {
  return (
    <form className="relative w-full max-w-3xl mx-auto h-16 shadow-md rounded-full overflow-hidden bg-base-150 dark:bg-dark-base-150">
      <button
        type="submit"
        className="absolute top-1/2 -translate-y-1/2 left-6 hover:text-base-green dark:hover:text-dark-base-green text-xl text-base-neutral dark:text-dark-base-neutral"
      >
        <IoSearch />
      </button>
      <input
        type="search"
        placeholder="Pesquise artigos antigos"
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
