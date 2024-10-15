"use client";

import Loading from "@/components/Loading";
import { useFormStatus } from "react-dom";

export default function CreateTagButton() {
  const { pending } = useFormStatus();
  return (
    <div className="w-20">
      <button
        type="submit"
        disabled={pending}
        className="h-8 w-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] transition-[outline] duration-300 outline outline-4 outline-offset-1 outline-transparent focus:outline-[#7be296] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
      >
        {pending && <Loading size={24} />}
        {!pending && (
          <p className="font-extrabold text-base-100 dark:text-base-100">
            Criar
          </p>
        )}
      </button>
    </div>
  );
}
