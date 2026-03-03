"use client";

import { useActionState, useRef, useState } from "react";
import { Button } from "../Buttons";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
  FieldsetPassTypeBtn,
} from "../Fieldset";
import { signIn } from "../../services/auth/signIn";
import Spinner from "../Spinner";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"text" | "password">("password");
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
      error: {},
    },
  );

  return (
    <form action={action} className="flex flex-col justify-center gap-2">
      <Fieldset error={!!state.error.email?.errors}>
        <FieldsetInput
          id="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FieldsetLabel
          htmlFor="email"
          label="E-mail"
          error={!!state.error.email?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.email?.errors} />
      <Fieldset error={!!state.error.password?.errors}>
        <FieldsetInput
          ref={passRef}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={type}
        />
        <FieldsetPassTypeBtn
          inputRef={passRef}
          state={type}
          setState={setType}
        />
        <FieldsetLabel
          htmlFor="password"
          label="Senha"
          error={!!state.error.password?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.password?.errors} />
      <FieldsetError error={state.error.form?.errors} />
      <Button disabled={pending} className="rounded h-10.5">
        {pending && <Spinner />} {pending ? "Carregando" : "Confirmar"}
      </Button>
    </form>
  );
}
