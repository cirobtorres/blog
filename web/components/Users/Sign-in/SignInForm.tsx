"use client";

import React from "react";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
} from "../../Fieldset";
import { signIn } from "../../../services/auth/signIn";
import Spinner from "../../Spinner";
import { FieldsetPassword } from "../../Fieldset/FieldsetPassword";
import { Button } from "../../Button";
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

type SignInFormProps = {
  mode?: "page" | "modal";
  redirectUrl?: string;
};

export default function SignInForm({
  mode = "page",
  redirectUrl = "",
}: SignInFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ZodReturnError | undefined>(
    undefined,
  );
  const passRef = React.useRef(null);

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) => {
      const result = await signIn(prevState, formData);

      if (
        mode === "modal" &&
        result.ok &&
        result.data &&
        "redirectUrl" in result.data
      ) {
        const nextUrl = (result.data as Record<string, string>).redirectUrl;
        if (nextUrl.startsWith("/")) {
          // Navigate synchronously before any re-render can remount @signInModal.
          window.location.replace(nextUrl);
          return result;
        }
      }

      if (!result.ok && result.error) {
        setErrors(result.error);
      }
      return result;
    },
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
      {mode === "modal" && (
        <>
          <input type="hidden" name="modal" value="true" />
          <input
            type="hidden"
            name="redirect_url"
            value={redirectUrl ? encodeURIComponent(redirectUrl) : ""}
          />
        </>
      )}
      <Fieldset error={!!errors?.email?.errors}>
        <FieldsetInput
          id="email"
          name="email"
          value={email}
          autoFocus
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
