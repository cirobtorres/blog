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
        <h1 className="text-[#26282b] dark:text-[#fff] text-3xl font-extrabold">
          Entrar
        </h1>
      </div>
      <div className="w-full">
        <div className="relative rounded border border-[#26282b] dark:border-[#fff]">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            className="dark:text-white text-[#26282b] bg-transparent outline-none w-full h-full px-4 py-3"
          />
          <label className="bg-main dark:bg-dark-main px-2 text-[#26282b] dark:text-[#fff] absolute start-3 -top-3 left-0">
            E-mail
          </label>
        </div>
        {state?.invalidCredentials && (
          <p className="pl-2 text-sm text-red-400">
            {state.invalidCredentials}
          </p>
        )}
      </div>
      <div className="w-full">
        <div className="relative rounded border border-[#26282b] dark:border-[#fff]">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="dark:text-white text-[#26282b] bg-transparent outline-none w-full h-full px-4 py-3"
          />
          <label className="bg-main dark:bg-dark-main px-2 text-[#26282b] dark:text-[#fff] absolute start-3 -top-3 left-0">
            Senha
          </label>
        </div>
        {state?.invalidCredentials && (
          <p className="pl-2 text-sm text-red-400">
            {state.invalidCredentials}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
