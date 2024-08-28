"use client";

import Loading from "@/components/Loading";
import { useFormStatus } from "react-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import {
  signInWithFacebook,
  signInWithGoogle,
} from "../../../lib/authentication";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full h-[44px] flex justify-center items-center 
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
          font-extrabold 
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
      formAction={signInWithGoogle}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-200 dark:bg-[#2c2c2c] hover:bg-base-300 dark:hover:bg-[#292929] 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-2 
          font-extrabold 
          text-base-neutral dark:text-base-100 
        `}
        >
          Entrar com{" "}
          <span className="flex items-center gap-2 text-[#ea4335]">
            Google <FaGoogle className="text-2xl" />
          </span>
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
      formAction={signInWithFacebook}
      className={`
        w-full h-12 
        flex justify-center items-center 
        rounded transition-colors group 
        bg-base-200 dark:bg-[#2c2c2c] hover:bg-base-300 dark:hover:bg-[#292929] 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-2
          font-extrabold 
          text-base-neutral dark:text-base-100 
        `}
        >
          Entrar com{" "}
          <span className="flex items-center text-[#1877f2]">
            Facebook <FaFacebookF className="text-2xl" />
          </span>
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
        bg-base-200 dark:bg-[#2c2c2c] hover:bg-base-300 dark:hover:bg-[#292929] 
      `}
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p
          className={`
          flex items-center gap-2
          font-extrabold 
          text-base-neutral dark:text-base-100 
        `}
        >
          Entrar com{" "}
          <span className="flex items-center gap-2 text-[#000]">
            Github <FaGithub className="text-3xl" />
          </span>
        </p>
      )}
    </button>
  );
}
