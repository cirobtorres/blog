"use client";

import React from "react";
import { validateOTP } from "../../../services/auth/validateOTP";
import { cn, linkVariants } from "../../../utils/variants";
import { Link } from "../../Links";
import { FieldsetError } from "../../Fieldset";
import { renewVCode } from "../../../services/auth/renewVCode";
import Spinner from "../../Spinner";
import FieldsetOTPCode from "../../Fieldset/FieldsetOTPCode";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RenewCodeButton from "./RenewCodeButton";
import { Button } from "../../Button";

interface ValidateEmailFormProps {
  email: string;
}

export default function ValidateEmailFormClient({
  email,
}: ValidateEmailFormProps) {
  const [code, setCode] = React.useState("");
  const [countdownRenewCode, setCountdownRenewCode] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasSubmitted = React.useRef(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [validateCodeState, validateCodeAction, isPendingValidateCode] =
    React.useActionState(
      async (prevState: ValidateEmailActionState, formData: FormData) => {
        const res = await validateOTP(prevState, formData);

        if (res.ok) {
          const params = new URLSearchParams(searchParams);
          params.set("step", "success");
          replace(`${pathname}?${params.toString()}`);
        }

        return res;
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

  const [resendCodeState, resendCodeAction, isPendingResendCode] =
    React.useActionState(renewVCode, { ok: false, success: null, error: null });

  // Auto submit inputOTK
  React.useEffect(() => {
    if (code.length === 6 && !isPendingValidateCode && !hasSubmitted.current) {
      hasSubmitted.current = true;
      const formData = new FormData();
      formData.set("code", code);
      React.startTransition(() => {
        validateCodeAction(formData);
      });
    }

    if (code.length < 6) {
      hasSubmitted.current = false;
    }
  }, [code, validateCodeAction, isPendingValidateCode]);

  // Invalid code: reset inputOTK and refocus
  React.useEffect(() => {
    if (validateCodeState.error?.form?.errors?.length > 0) {
      setCode("");
      hasSubmitted.current = false;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [validateCodeState]);

  // Countdown tick
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdownRenewCode > 0) {
      timer = setTimeout(
        () => setCountdownRenewCode(countdownRenewCode - 1),
        1000,
      );
    }
    return () => clearTimeout(timer);
  }, [countdownRenewCode]);

  // Countdown start
  const handleResendClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (countdownRenewCode > 0 || isPendingResendCode) return;
    React.startTransition(() => {
      resendCodeAction();
      setCountdownRenewCode(60);
    });
  };

  const isSuccess = searchParams.get("step") === "success";

  if (isSuccess)
    return (
      <div className="w-screen flex items-center justify-center border-y shadow bg-stone-925">
        <div className="h-80 w-full my-auto flex items-center justify-center bg-stone-100 dark:bg-stone-925">
          <div className="flex flex-col gap-4 mx-4 text-center">
            <h1 className="font-bold text-3xl text-neutral-900 dark:text-neutral-100">
              Email validado com sucesso!
            </h1>
            <Link
              href="/"
              className={cn(
                linkVariants({ variant: "button" }),
                "max-w-40 mx-auto border",
              )}
            >
              Retornar
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen flex items-center justify-center border-y shadow-md bg-stone-100 dark:bg-stone-925">
      <form
        action={validateCodeAction}
        className="w-full max-w-120 flex flex-col justify-center items-center px-8 py-16"
      >
        <h1 className="text-2xl mb-6 min-[450px]:text-3xl font-bold">
          Cheque o seu email
        </h1>
        <div className="mb-3 flex flex-col justify-center items-center">
          <p className="text-xs min-[450px]:text-base text-neutral-600 dark:text-neutral-400 text-center font-normal">
            Por favor, verifique o código de 6 dígitos que enviamos para{" "}
            <b className="text-neutral-600 dark:text-neutral-100">{email}</b>.
          </p>
        </div>
        <div className="mb-3 w-full h-px inline-grid">
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)]" />
          <div className="w-full h-px grid-cols-1 bg-[linear-gradient(to_right,transparent_0%,var(--color-primary)_25%,var(--color-primary)_75%,transparent_100%)] blur-sm" />
        </div>
        <div className="mb-6 flex flex-col justify-center items-center gap-3">
          <FieldsetOTPCode
            inputRef={inputRef}
            value={code}
            onChange={setCode}
            pending={isPendingValidateCode}
          />
          <RenewCodeButton
            onClick={handleResendClick}
            isResending={isPendingResendCode}
            countdown={countdownRenewCode}
          />
          {resendCodeState?.ok && (
            <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              Código enviado para{" "}
              <strong className="text-neutral-600 dark:text-neutral-100">
                {email}
              </strong>
            </p>
          )}
          <small className="text-[10px] min-[450px]:text-xs font-bold text-neutral-600 dark:text-neutral-400">
            O código é válido por 1 hora
          </small>
        </div>
        <div className="mb-6 w-full flex justify-between items-center gap-2">
          <Link
            href="/"
            variant="outline"
            className="h-8 w-full text-xs min-[450px]:h-10 min-[450px]:text-base flex-1 rounded"
          >
            Voltar
          </Link>
          <Button
            type="submit"
            disabled={code.length < 6 || isPendingValidateCode}
            className="h-8 w-full text-xs min-[450px]:h-10 min-[450px]:text-base flex-1 rounded disabled:opacity-50 disabled:text-neutral-300 disabled:border-stone-400 disabled:bg-stone-400 dark:disabled:text-stone-700 dark:disabled:border-stone-800 dark:disabled:bg-stone-900"
          >
            {isPendingValidateCode && <Spinner />} Confirmar
          </Button>
        </div>
        <FieldsetError error={validateCodeState.error?.form?.errors} />
        <p className="text-xs min-[450px]:text-sm text-center text-neutral-600 dark:text-neutral-400 font-normal">
          Não consegue fazer login?{" "}
          <Link
            href="/" // TODO
            className="text-sm text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
          >
            Clique aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
