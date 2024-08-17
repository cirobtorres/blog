"use client";

import Loading from "@/components/Loading";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-blue hover:bg-base-blue-hover
        dark:bg-dark-base-blue dark:hover:bg-dark-base-blue-hover
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          text-xl font-extrabold 
          text-base-100 dark:text-base-100 
        `}
        >
          Login
        </p>
      )}
    </button>
  );
}
