"use client";

import { translations } from "@zxcvbn-ts/language-pt-br";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import React from "react";
import {
  Fieldset,
  FieldsetError,
  FieldsetGeneratePassword,
  FieldsetInput,
  FieldsetLabel,
  FieldsetPassTypeBtn,
  PasswordStrength,
} from "../Fieldset";
import CopyToClipBoard from "../CopyToClipBoard";
import Spinner from "../Spinner";
import { signUp } from "../../services/auth/signUp";
import { Button } from "../Buttons";

const SignUpForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState<"text" | "password">("password");

  const ref = React.useRef(null);
  const options = {
    translations,
  };
  zxcvbnOptions.setOptions(options);
  const strength = zxcvbn(password);

  const [state, action, pending] = React.useActionState(
    async (prevState: SignUpActionState) => {
      const formData = new FormData();

      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("strength", strength.score.toString());

      return await signUp(prevState, formData);
    },
    {
      ok: false,
      success: null,
      error: {},
    },
  );

  return (
    <form action={action} className="flex flex-col justify-center gap-2">
      <Fieldset error={!!state.error.name}>
        <FieldsetInput
          id="name"
          value={name}
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />
        <FieldsetLabel htmlFor="name" label="Nome" error={!!state.error.name} />
      </Fieldset>
      <FieldsetError error={state.error?.name?.errors} />
      <Fieldset error={!!state.error.email}>
        <FieldsetInput
          id="email"
          type="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="truncate"
        />
        <FieldsetLabel
          htmlFor="email"
          label="E-mail"
          error={!!state.error.email}
        />
      </Fieldset>
      <FieldsetError error={state.error?.email?.errors} />
      <Fieldset error={!!state.error.password}>
        <FieldsetInput
          ref={ref}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={type}
        />
        <CopyToClipBoard
          toCopy={password}
          className="max-[400px]:hidden absolute top-1/2 -translate-y-1/2 right-24.5"
        />
        <FieldsetGeneratePassword
          inputRef={ref}
          setState={setPassword}
          className="absolute top-1/2 -translate-y-1/2 right-9"
        />
        <FieldsetPassTypeBtn inputRef={ref} state={type} setState={setType} />
        <FieldsetLabel
          htmlFor="password"
          label="Senha"
          error={!!state.error.password}
        />
      </Fieldset>
      <FieldsetError error={state.error?.password?.errors} />
      <FieldsetError error={state.error?.strength?.errors} />
      <PasswordStrength strength={strength.score} />
      {password !== "" && (
        <ul className="mx-2">
          {strength.feedback.warning !== null && (
            <li className="text-xs font-medium text-red-500">
              {strength.feedback.warning}
            </li>
          )}
          {strength.feedback.suggestions.map((text, i) => (
            <li key={i} className="text-xs font-medium text-amber-500">
              {text}
            </li>
          ))}
          {strength.score === 4 && (
            <li className="text-xs text-center font-medium text-emerald-500">
              Senha forte
            </li>
          )}
        </ul>
      )}
      <FieldsetError error={state.error?.form?.errors} />
      <Button disabled={pending} className="rounded h-10.5">
        {pending && <Spinner />} {pending ? "Cadastrando" : "Confirmar"}
      </Button>
    </form>
  );
};

export default SignUpForm;
