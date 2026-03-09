"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "../Buttons";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
} from "../Fieldset";
import { signIn } from "../../services/auth/signIn";
import Spinner from "../Spinner";
import { FieldsetPassword } from "../Fieldset/FieldsetPassword";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const [state, action, pending] = useActionState(
    async (prevState: SignInActionState) => {
      const formData = new FormData();

      formData.set("email", email);
      formData.set("password", password);

      return await signIn(prevState, formData);
    },
    {
      ok: false,
      success: null,
      error: {
        email: {
          errors: null,
        },
        password: {
          errors: null,
        },
      },
    },
  );

  return (
    <form action={action} className="w-full flex flex-col justify-center gap-2">
      <Fieldset>
        <FieldsetInput
          id="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          error={!!state.error.email?.errors}
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
        passErrors={state.error.password?.errors}
        strErrors={state.error.strength?.errors}
      />
      <FieldsetError error={state.error.password?.errors} />
      <FieldsetError error={state.error.form?.errors} />
      <Button disabled={pending} className="rounded h-10.5">
        {pending && <Spinner />} {pending ? "Carregando" : "Confirmar"}
      </Button>
    </form>
  );
}
