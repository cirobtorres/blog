"use client";

import { Suspense, useState } from "react";
import { useFormState } from "react-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { signIn } from "@/lib/authentication";
import SubmitButton from "./SubmitButton";
import CheckBox from "../CheckBox";

export default function SignInForm() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [state, action] = useFormState<State, FormData>(signIn, {});
  return (
    <form
      action={action}
      className="w-full max-w-96 mx-auto flex flex-col justify-center gap-3"
    >
      <input
        type="hidden"
        id="captcha-token"
        name="captcha-token"
        value={captchaToken}
      />
      <Input id="email" placeholder="email" />
      {state?.invalidCredentials && (
        <p className="pl-2 text-sm text-red-500">{state.invalidCredentials}</p>
      )}
      <Input id="password" placeholder="password" />
      {state?.invalidCredentials && (
        <p className="pl-2 text-sm text-red-500">{state.invalidCredentials}</p>
      )}
      <CheckBox id="privacy-policy" text="Privacidade e uso de dados" />
      {state?.privacyPolicies && (
        <p className="pl-2 text-sm text-red-500">{state.privacyPolicies}</p>
      )}
      <Turnstile
        siteKey={
          process.env.CLOUDFLARE_TURNSTILE_SITE_KEY ||
          "0x4AAAAAAAitZmwhfpmMgO9Z"
        }
        onSuccess={(token) => {
          setCaptchaToken(token);
        }}
      />
      {state?.captchaToken && (
        <p className="pl-2 text-sm text-red-500">{state.captchaToken}</p>
      )}
      <SubmitButton />
    </form>
  );
}

const Input = ({ id, placeholder }: { id: string; placeholder?: string }) => {
  return (
    <>
      <div className="w-full">
        <div className="h-10 relative rounded border border-base-neutral dark:border-dark-base-neutral [&_input]:focus:border-blue-600 dark:[&_input]:focus:border-blue-600">
          <input
            id={id}
            name={id}
            type={id}
            placeholder={placeholder}
            className="dark:text-dark-base-neutral text-base-neutral bg-transparent outline-none w-full h-full px-4 py-3 placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
          />
          <label className="text-sm leading-3 bg-base-100 dark:bg-dark-base-100 px-2 text-base-neutral dark:text-dark-base-neutral absolute start-3 -top-[6px] left-0">
            E-mail
          </label>
        </div>
      </div>
    </>
  );
};
