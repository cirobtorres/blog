"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import {
  FacebookSubmitButton,
  GithubSubmitButton,
  GoogleSubmitButton,
} from "@/components/SignInForm/SubmitButton";
import SignInForm from "@/components/SignInForm";

export default function LoginModal() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOutsideClick = (event: React.MouseEvent) => {
    // event.preventDefault();
    if (event.target === event.currentTarget) {
      dialogRef.current?.close();
      document.body.classList.remove("modal-shown");
    }
  };

  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.classList.add("modal-shown");
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleOutsideClick}
      onClose={() => {
        router.back();
        document.body.classList.remove("modal-shown");
      }}
      className="w-full max-w-96 flex flex-col gap-2 p-4 absolute top-1/4 -translate-y-1/4 left-1/2 -translate-x-1/2 rounded border border-base-border dark:border-[#494949]  bg-base-100 dark:bg-dark-base-100 backdrop:bg-black/45"
    >
      <div className="w-full flex justify-between items-center mx-auto">
        <h1 className="text-base-neutral dark:text-dark-base-neutral text-3xl font-extrabold">
          Entrar
        </h1>
        <button
          onClick={() => {
            dialogRef.current?.close();
            document.body.classList.remove("modal-shown");
          }}
        >
          <IoClose className="text-3xl dark:text-dark-base-neutral dark:hover:text-dark-base-neutral-hover p-1 rounded-lg border border-base-border dark:border-[#494949] " />
        </button>
      </div>
      <SignInForm />
      <div className="flex flex-col gap-2">
        <form>
          <GoogleSubmitButton />
        </form>
        <form>
          <FacebookSubmitButton />
        </form>
        <form>
          <GithubSubmitButton />
        </form>
      </div>
    </dialog>
  );
}
