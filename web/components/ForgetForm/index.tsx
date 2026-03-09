"use client";

import React from "react";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../Fieldset";
import { Button } from "../Buttons";
import FieldsetOTPCode from "../Fieldset/FieldsetOTPCode";
import Spinner from "../Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { passChangePermission } from "../../services/auth/password-forgotten/passChangePermission";
import { forgetEmailPass } from "../../services/auth/password-forgotten/forgetEmailPass";
import { passChange } from "../../services/auth/password-forgotten/passChange";
import { FieldsetPassword } from "../Fieldset/FieldsetPassword";
import { translations } from "@zxcvbn-ts/language-pt-br";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { Link } from "../Links";

export default function ForgetForm({ hasToken }: { hasToken?: boolean }) {
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const passRef = React.useRef(null);
  const hasSubmitted = React.useRef(false);
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  const pathname = usePathname();
  const { replace } = useRouter();

  const options = {
    translations,
  };
  zxcvbnOptions.setOptions(options);
  const strength = zxcvbn(password);

  const handleEmailChange = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set("email", val.toLowerCase());
    } else {
      params.delete("email");
    }
    setEmail(val);
    replace(`${pathname}?${params.toString()}`);
  };

  // Password change
  const [passChangedState, passChangedAction, isPassChangedPending] =
    React.useActionState(
      async (prevState: PassChangeActionState, formData: FormData) => {
        const response = await passChange(prevState, formData);

        if (response.ok) {
          const params = new URLSearchParams(searchParams);
          params.set("step", "success");
          replace(`${pathname}?${params.toString()}`);
        }

        return response;
      },
      {
        ok: false,
        success: null,
        error: {
          password: {
            errors: null,
          },
        },
      },
    );

  // Email code confirmation
  const [sendCodeState, sendCodeAction, isSendCodePending] =
    React.useActionState(
      async (prevState: PassChangeCodeActionState, formData: FormData) => {
        const response = await passChangePermission(prevState, formData);

        if (response.ok) {
          const params = new URLSearchParams(searchParams);
          params.set("step", "password-changed");
          replace(`${pathname}?${params.toString()}`);
        }

        return response;
      },
      {
        ok: false,
        success: null,
        error: {
          code: {
            errors: null,
          },
        },
      },
    );

  // Password change request via email
  const [forgottenEmailState, forgottenEmailAction, isForgottenEmailPending] =
    React.useActionState(
      async (prevState: ForgetEmailPassActionState) => {
        const formData = new FormData();
        formData.set("email", email);

        const response = await forgetEmailPass(prevState, formData);

        if (response.ok) {
          const params = new URLSearchParams(searchParams);
          params.set("step", "code");
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

  // Auto submit inputOTK
  React.useEffect(() => {
    if (code.length === 6 && !isSendCodePending && !hasSubmitted.current) {
      hasSubmitted.current = true;

      const formData = new FormData();
      formData.set("code", code);

      React.startTransition(() => {
        sendCodeAction(formData);
      });
    }

    if (code.length < 6) {
      hasSubmitted.current = false;
    }
  }, [code, sendCodeAction, isSendCodePending]);

  const isStepCode = forgottenEmailState.ok || step === "code";
  const isStepSuccess = passChangedState.ok || step === "success";

  if (isStepSuccess) {
    return (
      <div className="w-full flex flex-col gap-2 mb-6">
        <h1 className="text-foreground text-3xl font-bold mb-8">
          Senha salva!
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          A senha de {email} foi alterada com sucesso.
        </p>
        <Link href="/" variant="button" className="max-w-30 mx-auto">
          Home
        </Link>
      </div>
    );
  }

  if (hasToken)
    return (
      <div className="w-full flex flex-col gap-2 mb-6">
        <h1 className="text-foreground text-3xl font-bold mb-8">
          Esqueceu sua senha?
        </h1>
        <p className="text-sm font-medium text-muted-foreground">
          Crie uma nova senha
        </p>
        <form action={passChangedAction} className="flex flex-col gap-2">
          <FieldsetPassword
            ref={passRef}
            value={password}
            onChange={setPassword}
            strength={strength}
            copyToClipboard
            genPassword
            passErrors={sendCodeState.error.password?.errors}
            strErrors={sendCodeState.error.strength?.errors}
          />
          <FieldsetError error={sendCodeState.error?.form?.errors} />
          <Button disabled={isPassChangedPending} className="w-full">
            {isPassChangedPending && <Spinner />}{" "}
            {isPassChangedPending ? "Salvando..." : "Confirmar"}
          </Button>
        </form>
      </div>
    );

  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="text-foreground text-3xl font-bold mb-8">
        Esqueceu sua senha?
      </h1>
      <p className="text-sm font-medium text-muted-foreground">
        Enviaremos um código de validação para seu e-mail
      </p>
      {isStepCode ? (
        <form action={sendCodeAction} className="flex flex-col gap-2">
          <div className="grid grid-cols-[16px_1fr] gap-4 border rounded-md p-4 bg-neutral-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 stroke-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <div>
              <p className="text-xs break-all text-emerald-500">
                <strong>{email}</strong>
              </p>
              <p className="text-xs text-foreground">
                Você receberá um código de validação se uma conta associada a
                esse email existir.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <FieldsetOTPCode
              inputRef={inputRef}
              value={code}
              onChange={setCode}
              pending={isSendCodePending}
            />
            <small className="text-[10px] min-[450px]:text-xs text-muted-foreground/75 font-medium">
              O código é válido por 1 hora
            </small>
          </div>
          <Button disabled={code.length < 6 || isSendCodePending}>
            {isSendCodePending && <Spinner />}{" "}
            {isSendCodePending ? "Salvando..." : "Confirmar"}
          </Button>
        </form>
      ) : (
        <form action={forgottenEmailAction} className="flex flex-col gap-2">
          <Fieldset>
            <FieldsetInput
              id="email"
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
          <Button disabled={isForgottenEmailPending} className="w-full">
            {isForgottenEmailPending && <Spinner />}{" "}
            {isForgottenEmailPending
              ? "Enviando código de validação..."
              : "Enviar código de validação"}
          </Button>
        </form>
      )}
    </div>
  );
}
