"use client";

import signIn from "@/lib/signIn";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

export default function AdminSignInForm() {
  const [state, action] = useFormState<State, FormData>(signIn, {});
  return (
    <form action={action} className="flex flex-col justify-center gap-3">
      <div className="">
        <h1 className="text-[#26282b] text-3xl font-extrabold">Entrar</h1>
      </div>
      <div>
        <div className="relative rounded border border-[#26282b]">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            className="bg-transparent outline-none px-4 py-3"
          />
          <label className="bg-[#e8ebeb] px-2 text-[#26282b] absolute start-3 -top-3 left-0">
            E-mail
          </label>
        </div>
        {state?.invalidCredentials && (
          <p className="pl-2 text-sm text-red-500">
            {state.invalidCredentials}
          </p>
        )}
      </div>
      <div>
        <div className="relative rounded border border-[#26282b]">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="bg-transparent outline-none px-4 py-3"
          />
          <label className="bg-[#e8ebeb] px-2 text-[#26282b] absolute start-3 -top-3 left-0">
            Senha
          </label>
        </div>
        {state?.invalidCredentials && (
          <p className="pl-2 text-sm text-red-500">
            {state.invalidCredentials}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
