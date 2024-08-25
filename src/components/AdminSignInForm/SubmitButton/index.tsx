"use client";

import Loading from "@/components/Loading";
import { useFormStatus } from "react-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";

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
        bg-base-green hover:bg-base-green-hover 
        dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover 
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

export function GoogleSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-200 dark:bg-dark-base-200 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-2
          text-xl font-extrabold 
          text-base-100 dark:text-base-100 
        `}
        >
          Entrar com Google <FaGoogle className="text-2xl" />
        </p>
      )}
    </button>
  );
}

export function FacebookSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-200 dark:bg-dark-base-200 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-1
          text-xl font-extrabold 
          text-base-100 dark:text-base-100 
        `}
        >
          Entrar com Facebook <FaFacebookF className="text-2xl" />
        </p>
      )}
    </button>
  );
}

export function GithubSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-200 dark:bg-dark-base-200 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-2
          text-xl font-extrabold 
          text-base-100 dark:text-base-100 
        `}
        >
          Entrar com Github <FaGithub className="text-2xl" />
        </p>
      )}
    </button>
  );
}
