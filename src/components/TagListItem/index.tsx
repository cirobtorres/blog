"use client";

import { useRef, useState } from "react";
import { tagDelete } from "@/lib/tag";
import Loading from "../Loading";

export default function TagListItem({
  id,
  slug,
  title,
  updated_at,
  created_at,
}: {
  id: string;
  slug: string;
  title: string;
  updated_at: string;
  created_at: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-fit text-start text-sm italic px-2 rounded transition-all duration-300 text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#fff]"
      >
        {title}
      </button>
      <Modal id={id} title={title} isOpen={isOpen} setIsOpen={setIsOpen} />
    </li>
  );
}

const Modal = ({
  id,
  title,
  isOpen,
  setIsOpen,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (!loading && ref.current && ref.current === event.target) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClickOutside}
      className={`z-50 fixed inset-0 transition-all duration-200 flex justify-center items-center ${
        isOpen
          ? "opacity-100 pointer-events-auto bg-black/35 dark:bg-blue-500/10"
          : "opacity-0 pointer-events-none bg-inherit"
      }`}
    >
      <div
        className={`max-w-[250px] border border-base-border dark:border-dark-base-border transition-all duration-300 flex flex-col rounded-2xl bg-base-100 dark:bg-dark-base-100 overflow-hidden ${
          isOpen ? "mb-[15%]" : "mb-[12.5%]"
        }`}
      >
        <div className="px-4 py-2 mb-2 border-b border-base-border dark:border-dark-base-border bg-base-200 dark:bg-dark-base-200">
          <h2 className="font-extrabold text-base-neutral dark:text-dark-base-neutral">
            <span className="uppercase">Excluir</span> tag
          </h2>
        </div>
        <p className="px-4 mb-2 text-base-green dark:text-dark-base-green font-extrabold">
          {title}
        </p>
        <small className="px-4 py-1 text-center border-y border-base-border dark:border-dark-base-border text-xs text-base-red dark:text-dark-base-red">
          Essa operação não pode ser desfeita!
        </small>
        <div className="px-4 my-4 flex gap-3">
          <button
            disabled={loading}
            onClick={() => setIsOpen(false)}
            className={`w-full flex-1 px-1 h-6 text-sm text-base-neutral dark:text-dark-base-neutral transition-colors duration-200 ${
              loading
                ? ""
                : "hover:text-base-neutral-hover hover:dark:text-[#fff]"
            }`}
          >
            Voltar
          </button>
          <button
            disabled={loading}
            onClick={(event) => {
              event.preventDefault();
              tagDelete(id);
              setLoading(true);
              // setIsOpen(false);
            }}
            className={`flex justify-center items-center transition-colors duration-200 w-full flex-1 px-1 h-6 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-red-500 dark:border-red-100 ${
              loading
                ? "bg-[#ff8181] dark:bg-[#fd7d7d]"
                : "bg-base-red hover:bg-[#ff8181] dark:bg-dark-base-red dark:hover:bg-[#fd7d7d]"
            }`}
          >
            {loading ? <Loading size={20} /> : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

// "use client";

// import { tagDelete } from "@/lib/tag";
// import { useEffect, useRef, useState } from "react";
// import Loading from "../Loading";
// import Link from "next/link";

// export default function TagListItem({
//   id,
//   slug,
//   title,
//   updated_at,
//   created_at,
// }: {
//   id: string;
//   slug: string;
//   title: string;
//   updated_at: string;
//   created_at: string;
// }) {
//   const ref = useRef<HTMLLIElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isOpen) return;
//     function handleClick(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     window.addEventListener("click", handleClick);
//     return () => window.removeEventListener("click", handleClick); // Clean up
//   }, [isOpen]);

//   return (
//     <li className="relative" ref={ref}>
//       <button
//         type="button"
//         disabled={loading}
//         onClick={() => setIsOpen(!isOpen)}
//         className={`relative w-fit text-sm italic px-2 rounded transition-all duration-300 ${
//           isOpen
//             ? "text-base-green dark:text-dark-base-green hover:text-base-green-hover hover:dark:text-[#fff]"
//             : "text-base-neutral dark:text-dark-base-neutral hover:text-base-neutral-hover hover:dark:text-[#fff]"
//         }`}
//       >
//         {loading ? (
//           <div className="w-4 mx-auto">
//             <Loading size={20} />
//           </div>
//         ) : (
//           title
//         )}
//       </button>
//       <div
//         className={`
//             text-center rounded-lg
//             absolute top-[calc(100%_+_4px)] left-1/2 -translate-x-1/2
//             border border-base-border dark:border-dark-base-border
//             bg-base-100 dark:bg-dark-base-100 overflow-hidden
//             transition-all duration-200 z-10
//             ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}
//           `}
//         style={{
//           visibility: isOpen ? "visible" : "hidden",
//           display: isOpen ? "block" : "hidden",
//         }}
//       >
//         <Link
//           href={`https://www.google.com.br/search?q=${encodeURIComponent(
//             title
//           )}`}
//           target="_blank"
//           className="w-full p-1.5 text-nowrap text-xs text-base-neutral dark:text-dark-base-neutral border-b border-base-border dark:border-dark-base-border bg-base-200 dark:bg-dark-base-200"
//         >
//           {title}
//         </Link>
//         <ul className="mt-1">
//           <li className="text-xs text-base-neutral dark:text-dark-base-neutral group">
//             <button
//               type="button"
//               className="w-full px-2 py-0.5 group-hover:bg-base-200 dark:group-hover:bg-dark-base-150"
//             >
//               Editar
//             </button>
//           </li>
//           <li className="text-xs text-base-neutral dark:text-dark-base-neutral group">
//             <button
//               type="button"
//               disabled={loading}
//               onClick={(event) => {
//                 event.preventDefault();
//                 tagDelete(id);
//                 setLoading(true);
//                 setIsOpen(false);
//               }}
//               className="w-full px-2 py-0.5 group-hover:bg-base-200 dark:group-hover:bg-dark-base-150"
//             >
//               Excluir
//             </button>
//           </li>
//         </ul>
//       </div>
//     </li>
//   );
// }
