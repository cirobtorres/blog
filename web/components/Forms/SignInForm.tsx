"use client";

import React, { useActionState, useRef } from "react";
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
import * as z from "zod";

const signInSchema = z.object({
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
});

interface ZodReturnError {
  email?: { errors: string[] } | undefined;
  password?: { errors: string[] } | undefined;
}

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ZodReturnError | undefined>(
    undefined,
  );
  const passRef = useRef(null);

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData) =>
      await signIn(prevState, formData),
    defaultState,
  );

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const result = signInSchema.safeParse({
      ...rawData,
    });

    if (!result.success) {
      const zodErrors = z.treeifyError(result.error).properties;
      setErrors(zodErrors);
      e.preventDefault();
      return;
    }
  };

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className="w-full flex flex-col justify-center gap-2"
    >
      <Fieldset error={!!errors?.email?.errors}>
        <FieldsetInput
          id="email"
          name="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors?.email?.errors}
        />
        <FieldsetLabel htmlFor="email" label="E-mail" />
      </Fieldset>
      <FieldsetError error={errors?.email?.errors} />
      <FieldsetPassword
        ref={passRef}
        value={password}
        onChange={setPassword}
        passErrors={errors?.password?.errors}
      />
      <FieldsetError error={state.error?.form?.errors} />
      <Button disabled={isPending} className="rounded h-9.5">
        {isPending && <Spinner />} {isPending ? "Carregando" : "Confirmar"}
      </Button>
    </form>
  );
}
