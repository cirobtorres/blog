"use client";

import React from "react";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
} from "../../Fieldset";
import { FieldsetPassword } from "../../Fieldset/FieldsetPassword";
import { protectedWebUrls, routeHandlers } from "../../../routing/routes";
import { Button } from "../../Button";
import { User } from "next-auth";
import Spinner from "../../Spinner";
import * as z from "zod";

const signInSchema = z.object({
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 8 e máximo de 32 caracteres"),
});

interface ZodReturnError {
  email?: { errors: string[] } | undefined;
  password?: { errors: string[] } | undefined;
  form?: { errors: string[] };
}

type SignInFormProps = {
  mode?: "page" | "modal";
  redirectUrl?: string;
};

function resolveRedirectUrl(userData: User, redirectUrl?: string) {
  if (redirectUrl) {
    const decoded = decodeURIComponent(redirectUrl);
    if (decoded.startsWith("/")) {
      return decoded;
    }
  }

  if (userData.authorities.includes("AUTHOR")) {
    return protectedWebUrls.authors;
  }

  return "/";
}

/**
 * @deprecated: use Keycloak instead
 */
export default function SignInForm({
  mode = "page",
  redirectUrl = "",
}: SignInFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<ZodReturnError | undefined>(
    undefined,
  );
  const [isPending, startTransition] = React.useTransition();
  const passRef = React.useRef(null);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const result = signInSchema.safeParse(rawData);

    if (!result.success) {
      setErrors(z.treeifyError(result.error).properties);
      return;
    }

    setErrors(undefined);

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
      credentials: "include",
    };

    startTransition(async () => {
      const loginResponse = await fetch(routeHandlers.login, options);

      if (loginResponse.ok) {
        const userData: User = await loginResponse.json();

        const nextUrl = resolveRedirectUrl(
          userData,
          redirectUrl ||
            new URLSearchParams(window.location.search).get("redirect_url") ||
            "",
        );

        window.location.replace(nextUrl);
        return;
      }

      if ([400, 401, 404, 409].includes(loginResponse.status)) {
        setErrors({
          email: { errors: ["E-mail ou senha incorretos"] },
          password: { errors: ["E-mail ou senha incorretos"] },
        });
        return;
      }

      setErrors({
        form: { errors: ["Ocorreu um erro inesperado. Tente mais tarde."] },
      });
    });
  }

  return (
    <form
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
      <FieldsetError error={errors?.form?.errors} />
      <Button disabled={isPending} className="rounded h-9.5">
        {isPending && <Spinner />} {isPending ? "Carregando" : "Confirmar"}
      </Button>
    </form>
  );
}
