"use client";

import signIn from "@/lib/signIn";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

export default function AdminSignInForm() {
  const [state, action] = useFormState<State, FormData>(signIn, {});
  return (
    <form
      action={action}
      className="w-96 h-full mx-auto flex flex-1 flex-col justify-center items-center gap-3"
    >
      <div className="w-full">
        <h1 className="text-neutral dark:text-dark-neutral text-3xl font-extrabold">
          Entrar
        </h1>
      </div>
      <div className="w-full">
        <div className="relative rounded border border-neutral dark:border-dark-neutral">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            className="dark:text-dark-neutral text-neutral bg-transparent outline-none w-full h-full px-4 py-3 placeholder:text-placeholder dark:placeholder:text-dark-placeholder"
          />
          <label className="bg-base-100 dark:bg-dark-base-100 px-2 text-neutral dark:text-dark-neutral absolute start-3 -top-3 left-0">
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
        <div className="relative rounded border border-neutral dark:border-dark-neutral">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="dark:text-dark-neutral text-neutral bg-transparent outline-none w-full h-full px-4 py-3 placeholder:text-placeholder dark:placeholder:text-dark-placeholder"
          />
          <label className="bg-base-100 dark:bg-dark-base-100 px-2 text-neutral dark:text-dark-neutral absolute start-3 -top-3 left-0">
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
  );
}
