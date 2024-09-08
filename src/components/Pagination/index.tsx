import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft } from "react-icons/md";

export default function Pagination() {
  return (
    <div className="flex justify-center gap-2 max-[375px]:gap-1">
      <button className="flex justify-center items-center text-xl max-[450px]:text-base size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button className="flex justify-center items-center text-xl max-[450px]:text-base size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        <MdKeyboardArrowLeft />
      </button>
      <button className="text-base max-[450px]:text-sm size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        3
      </button>
      <button className="text-base max-[450px]:text-sm size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        4
      </button>
      <button className="text-base max-[450px]:text-sm size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        5
      </button>
      <button className="flex justify-center items-center text-xl max-[450px]:text-base size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        <MdKeyboardArrowLeft className="rotate-180" />
      </button>
      <button className="flex justify-center items-center text-xl max-[450px]:text-base size-12 max-[375px]:size-8 max-[450px]:size-10 shadow-md hover:text-base-green hover:dark:text-dark-base-green text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150">
        <MdKeyboardDoubleArrowLeft className="rotate-180" />
      </button>
    </div>
  );
}
