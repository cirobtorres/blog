"use client";

import React from "react";
import {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetError,
} from "../../Fieldset";
import Spinner from "../../Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { forgetEmailPass } from "../../../services/auth/forgetEmailPass";
import { Button } from "../../Button";
import { Link } from "../../Links";

export default function ForgetForm() {
  const [email, setEmail] = React.useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [forgottenEmailState, forgottenEmailAction, isForgottenEmailPending] =
    React.useActionState(
      async (prevState: ForgetEmailPassActionState) => {
        const formData = new FormData();
        formData.set("email", email);

        const response = await forgetEmailPass(prevState, formData);

        if (response.ok) {
          const params = new URLSearchParams(searchParams);
          params.set("step", "email-sent");
          replace(`${pathname}?${params.toString()}`);
        }

        return response;
      },
      {
        ok: false,
        success: null,
        error: {
          email: {
            errors: null,
          },
        },
      },
    );

  const handleEmailChange = (val: string) => {
    const normalizedEmail = val.toLowerCase();
    const params = new URLSearchParams(searchParams);

    if (normalizedEmail) {
      params.set("email", normalizedEmail);
    } else {
      params.delete("email");
    }

    setEmail(normalizedEmail);
    replace(`${pathname}?${params.toString()}`);
  };

  const isEmailSent =
    forgottenEmailState.ok || searchParams.get("step") === "email-sent";

  if (isEmailSent) {
    return (
      <div className="w-full flex flex-col items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold mb-8">Verifique seu e-mail</h1>

        <p className="text-neutral-500 text-center">
          Se existir uma conta associada a{" "}
          <strong className="text-neutral-100">{email}</strong>, enviaremos um
          link para redefinir sua senha.
        </p>

        <p className="text-xs font-medium text-neutral-500 text-center antialiased">
          O link é temporário. Após abrir o e-mail, você será levado para uma
          tela para redefinição de senha.
        </p>

        <Link href="/" variant="button" className="max-w-38 h-9.5 mx-auto mt-4">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="text-3xl font-bold mb-8">Esqueceu sua senha?</h1>

      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-500">
        Enviaremos um link de redefinição para seu e-mail.
      </p>

      <form action={forgottenEmailAction} className="flex flex-col gap-2">
        <Fieldset>
          <FieldsetInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!!forgottenEmailState.error.email?.errors}
          />

          <FieldsetLabel
            htmlFor="email"
            label="E-mail"
            error={!!forgottenEmailState.error.email?.errors}
          />
        </Fieldset>

        {!forgottenEmailState.ok && (
          <FieldsetError error={forgottenEmailState?.error?.email?.errors} />
        )}

        <Button disabled={isForgottenEmailPending} className="w-full max-h-9.5">
          {isForgottenEmailPending && <Spinner />}{" "}
          {isForgottenEmailPending
            ? "Enviando link de redefinição..."
            : "Enviar link de redefinição"}
        </Button>
      </form>
    </div>
  );
}
