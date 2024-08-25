import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft } from "react-icons/md";

export default function Pagination() {
  return (
    <div className="flex justify-center gap-2">
      <div className="relative group">
        <button className="flex justify-center items-center text-3xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
          <MdKeyboardDoubleArrowLeft />
        </button>
        <p
          className={`
          transition-opacity duration-200 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
        >
          Primeiro
        </p>
      </div>
      <div className="relative group">
        <button className="flex justify-center items-center text-3xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
          <MdKeyboardArrowLeft />
        </button>
        <p
          className={`
          transition-opacity duration-200 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
        >
          Voltar
        </p>
      </div>
      <button className="text-xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        3
      </button>
      <button className="text-xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        4
      </button>
      <button className="text-xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        5
      </button>
      <div className="relative group">
        <button className="flex justify-center items-center text-3xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
          <MdKeyboardArrowLeft className="rotate-180" />
        </button>
        <p
          className={`
          transition-opacity duration-200 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
        >
          Avançar
        </p>
      </div>
      <div className="relative group">
        <button className="flex justify-center items-center text-3xl size-16 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
          <MdKeyboardDoubleArrowLeft className="rotate-180" />
        </button>
        <p
          className={`
          transition-opacity duration-200 mt-3 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
        >
          Último
        </p>
      </div>
    </div>
  );
}
