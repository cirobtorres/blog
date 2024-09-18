"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  submitForm,
  title,
  helpText,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  submitForm: () => void;
  title: string;
  helpText: string;
}) => {
  const handleClickOutside = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      document.body.classList.remove("modal-shown");
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <dialog
        onClick={handleClickOutside}
        className="flex items-center justify-center z-50 fixed inset-0 size-full backdrop-blur-sm bg-black/25"
      >
        <div className="mix-w-[300px] max-w-[400px] p-8 rounded-xl bg-base-100 dark:bg-dark-base-100">
          <div className="relative flex gap-1 items-center mb-4 pr-8">
            <h1 className="truncate font-extrabold text-base-green dark:text-dark-base-green">
              {title}
            </h1>
            <button
              type="button"
              className="absolute -top-2 -right-2 text-base-neutral dark:text-dark-base-neutral rounded-full p-2 transition-all hover:rotate-90 hover:bg-base-100 dark:hover:bg-dark-base-150"
              onClick={(event) => {
                event.preventDefault();
                document.body.classList.remove("modal-shown");
                setIsOpen(false);
              }}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-base-neutral dark:text-dark-base-neutral">
              {helpText}
            </p>
          </div>
          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              document.body.classList.remove("modal-shown");
              submitForm();
              setIsOpen(false);
            }}
            className="h-full min-w-32 mx-auto flex justify-center items-center px-2 py-1 rounded-xl font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
          >
            Confirmar
          </button>
        </div>
      </dialog>
    )
  );
};

export default ConfirmationModal;
