"use client";

import { signIn } from "@/lib/authentication";
import { useFormState } from "react-dom";
import SubmitButton, {
  FacebookSubmitButton,
  GithubSubmitButton,
  GoogleSubmitButton,
} from "./SubmitButton";

export default function SignInForm() {
  const [state, action] = useFormState<State, FormData>(signIn, {});
  return (
    <div className="w-96 mx-auto flex flex-col gap-3 mt-28">
      <form
        action={action}
        className="w-full h-full flex flex-1 flex-col justify-center items-center gap-3"
      >
        <div className="w-full mb-4">
          <h1 className="text-base-neutral dark:text-dark-base-neutral text-3xl font-extrabold">
            Entrar
          </h1>
        </div>
        <div className="w-full">
          <div className="relative rounded border border-base-neutral dark:border-dark-base-neutral">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              className="dark:text-dark-base-neutral text-base-neutral bg-transparent outline-none w-full h-full px-4 py-3 placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
            />
            <label className="bg-base-100 dark:bg-dark-base-100 px-2 text-base-neutral dark:text-dark-base-neutral absolute start-3 -top-3 left-0">
              E-mail
            </label>
          </div>
          {state?.invalidCredentials && (
            <p className="pl-2 text-sm text-base-red dark:text-dark-base-red">
              {state.invalidCredentials}
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="relative rounded border border-base-neutral dark:border-dark-base-neutral">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              className="dark:text-dark-base-neutral text-base-neutral bg-transparent outline-none w-full h-full px-4 py-3 placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
            />
            <label className="bg-base-100 dark:bg-dark-base-100 px-2 text-base-neutral dark:text-dark-base-neutral absolute start-3 -top-3 left-0">
              Senha
            </label>
          </div>
          {state?.invalidCredentials && (
            <p className="pl-2 text-sm text-base-red dark:text-dark-base-red">
              {state.invalidCredentials}
            </p>
          )}
        </div>
        <SubmitButton />
      </form>
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
  );
}
