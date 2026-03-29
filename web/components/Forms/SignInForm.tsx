"use client";

import { useActionState, useRef, useState } from "react";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
} from "../Fieldset";
import { signIn } from "../../services/auth/signIn";
import Spinner from "../Spinner";
import { FieldsetPassword } from "../Fieldset/FieldsetPassword";
import { Button } from "../Button";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState) => {
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
      data: null,
    },
  );

  return (
    <form action={action} className="w-full flex flex-col justify-center gap-2">
      <Fieldset error={!!state.error.email?.errors}>
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
      <FieldsetError error={state.error.form?.errors} />
      <Button disabled={isPending} className="rounded h-9.5">
        {isPending && <Spinner />} {isPending ? "Carregando" : "Confirmar"}
      </Button>
    </form>
  );
}
