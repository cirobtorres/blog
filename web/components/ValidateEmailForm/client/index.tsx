"use client";

import React from "react";
import { validateOTP } from "../../../services/auth/validateOTP";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../InputOTP";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button, buttonVariants } from "../../Buttons";
import { cn, linkVariants } from "../../../utils/className";
import { Link } from "../../Links";
import { FieldsetError } from "../../Fieldset";
import { renewVCode } from "../../../services/auth/renewVCode";
import Spinner from "../../Spinner";

interface ValidateEmailFormProps {
  email: string;
}

async function handleValidate(
  prevState: ValidateEmailActionState,
  formData: FormData,
) {
  return await validateOTP(prevState, formData);
}

export default function ValidateEmailFormClient({
  email,
}: ValidateEmailFormProps) {
  const [vCode, setVCode] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);
  const hasSubmitted = React.useRef(false);

  const [state, action, isPending] = React.useActionState(handleValidate, {
    ok: false,
    success: null,
    error: {},
  });

  const [resendState, resendAction, isResending] = React.useActionState(
    renewVCode,
    { ok: false, success: null, error: null },
  );

  React.useEffect(() => {
    if (vCode.length === 6 && !isPending && !hasSubmitted.current) {
      hasSubmitted.current = true;
      const formData = new FormData();
      formData.set("vCode", vCode);
      React.startTransition(() => {
        action(formData);
      });
    }

    if (vCode.length < 6) {
      hasSubmitted.current = false;
    }
  }, [vCode, action, isPending]);

  React.useEffect(() => {
    if (state.error?.form?.errors?.length > 0) {
      const timer = setTimeout(() => {
        setVCode("");
        hasSubmitted.current = false;
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [state]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResendClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (countdown > 0 || isResending) return;
    React.startTransition(() => {
      resendAction();
      setCountdown(60);
    });
  };

  if (state.ok)
    return (
      <div className="w-screen flex items-center justify-center bg-background">
        <div className="h-80 w-full my-auto flex items-center justify-center bg-black">
          <div className="flex flex-col gap-4 mx-4 text-center">
            <h1 className="font-bold text-3xl text-foreground">
              Email validado com sucesso!
            </h1>
            <Link
              href="/"
              className={cn(
                linkVariants({ variant: "button" }),
                "max-w-40 mx-auto",
              )}
            >
              Retornar
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <form
      action={action}
      className="w-full max-w-120 flex flex-col gap-6 justify-center items-center px-8 py-16 rounded-3xl border bg-neutral-900"
    >
      <h1 className="text-2xl min-[450px]:text-3xl font-bold text-foreground">
        Cheque o seu email
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="text-xs min-[450px]:text-base text-neutral-400 text-center font-normal">
          Por favor, verifique o código de 6 dígitos que enviamos para{" "}
          <b className="text-foreground">{email}</b>.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <fieldset className="flex flex-col justify-center items-center gap-3">
          <label
            htmlFor="v-code"
            className="text-xs font-medium text-neutral-400"
          >
            Código de verificação
          </label>
          <InputOTP
            id="v-code"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={vCode}
            onChange={(v) => setVCode(v.toUpperCase())}
            disabled={isPending}
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:min-[450px]:h-12 *:data-[slot=input-otp-slot]:min-[450px]:w-12">
              <InputOTPSlot
                index={0}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
              <InputOTPSlot
                index={1}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
              <InputOTPSlot
                index={2}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:min-[450px]:h-12 *:data-[slot=input-otp-slot]:min-[450px]:w-12">
              <InputOTPSlot
                index={3}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
              <InputOTPSlot
                index={4}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
              <InputOTPSlot
                index={5}
                aria-invalid={state?.error?.form?.errors.length > 0}
              />
            </InputOTPGroup>
          </InputOTP>
        </fieldset>
        <Button
          type="button"
          variant="outline"
          onClick={handleResendClick}
          disabled={isResending || countdown > 0}
          className="text-xs min-[450px]:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "size-3 min-[450px]:size-4",
              isResending ? "animate-spin" : "",
            )}
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          {countdown > 0 ? countdown : "Reenviar código"}
        </Button>
        {resendState?.ok && (
          <p className="text-xs font-medium text-muted-foreground">
            Código enviado para{" "}
            <strong className="text-foreground">{email}</strong>
          </p>
        )}
        <small className="text-[10px] min-[450px]:text-xs text-neutral-400 font-medium">
          O código é válido por 1 hora
        </small>
      </div>
      <div className="w-full flex justify-between items-center gap-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 w-full text-xs min-[450px]:h-10 min-[450px]:text-base flex-1 rounded",
          )}
        >
          Voltar
        </Link>
        <Button
          type="submit"
          disabled={vCode.length < 6 || isPending}
          className={cn(
            buttonVariants(),
            "h-8 w-full text-xs min-[450px]:h-10 min-[450px]:text-base flex-1 rounded",
          )}
        >
          {isPending && <Spinner />} Confirmar
        </Button>
      </div>
      <FieldsetError error={state.error?.form?.errors} />
      <p className="text-xs min-[450px]:text-sm text-center text-neutral-400 font-normal">
        Não consegue fazer login?{" "}
        <Link
          href="/" // TODO
          className="text-xs min-[450px]:text-sm text-primary underline underline-offset-2"
        >
          Clique aqui
        </Link>
      </p>
    </form>
  );
}
