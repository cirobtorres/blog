"use client";

import { translations } from "@zxcvbn-ts/language-pt-br";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import React from "react";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../Fieldset";
import Spinner from "../Spinner";
import { signUp } from "../../services/auth/signUp";
import { Button } from "../Buttons";
import { Checkbox } from "../Fieldset/Checkbox";
import { FieldsetPassword } from "../Fieldset/FieldsetPassword";
import { Link } from "../Links";

const SignUpForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [termsCheckbox, setTermsCheckbox] = React.useState(true);

  const passRef = React.useRef(null);

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
      formData.set("termsCheckbox", String(termsCheckbox));
      formData.set("strength", strength.score.toString());

      return await signUp(prevState, formData);
    },
    {
      ok: false,
      success: null,
      error: {
        name: {
          errors: null,
        },
        email: {
          errors: null,
        },
        password: {
          errors: null,
        },
        strength: {
          errors: null,
        },
        termsCheckbox: {
          errors: null,
        },
      },
    },
  );

  return (
    <form action={action} className="w-full flex flex-col justify-center gap-2">
      <Fieldset error={!!state.error.name?.errors}>
        <FieldsetInput
          id="name"
          value={name}
          placeholder="John Doe"
          maxLength={65}
          onChange={(e) => setName(e.target.value)}
          error={state.error.name?.errors}
        />
        <FieldsetLabel
          htmlFor="name"
          label="Nome"
          error={!!state.error.name?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.name?.errors} />
      <Fieldset error={!!state.error.email?.errors}>
        <FieldsetInput
          id="email"
          type="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="truncate"
          error={state.error.email?.errors}
        />
        <FieldsetLabel
          htmlFor="email"
          label="E-mail"
          error={!!state.error.email?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.email?.errors} />
      <FieldsetPassword
        ref={passRef}
        value={password}
        onChange={setPassword}
        strength={strength}
        copyToClipboard
        genPassword
        passErrors={state.error.password?.errors}
        strErrors={state.error.strength?.errors}
      />
      <fieldset className="flex items-start gap-2">
        <Checkbox
          id="terms-checkbox"
          name="terms-checkbox"
          checked={termsCheckbox}
          aria-invalid={!!state.error.termsCheckbox?.errors}
          onCheckedChange={(checked) => setTermsCheckbox(checked === true)}
        />
        <label
          htmlFor="terms-checkbox"
          className="text-xs text-neutral-900 dark:text-neutral-100 leading-4 font-medium select-none"
        >
          Ao clicar em confirmar, você concorda com as{" "}
          <Link
            href="/"
            className="text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
          >
            políticas de privacidade e uso de dados
          </Link>{" "}
          do website.
        </label>
      </fieldset>
      <FieldsetError error={state.error?.termsCheckbox?.errors} />
      <FieldsetError error={state.error?.form?.errors} />
      <Button type="submit" disabled={pending} className="rounded h-10.5">
        {pending && <Spinner />} {pending ? "Cadastrando" : "Confirmar"}
      </Button>
    </form>
  );
};

export default SignUpForm;
