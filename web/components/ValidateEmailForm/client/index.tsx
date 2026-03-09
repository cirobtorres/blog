"use client";

import React from "react";
import { validateOTP } from "../../../services/auth/validateOTP";
import { Button, buttonVariants } from "../../Buttons";
import { cn, inputBorder, linkVariants } from "../../../utils/className";
import { Link } from "../../Links";
import { FieldsetError } from "../../Fieldset";
import { renewVCode } from "../../../services/auth/renewVCode";
import Spinner from "../../Spinner";
import FieldsetOTPCode from "../../Fieldset/FieldsetOTPCode";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
      <div className="w-screen flex items-center justify-center border-y shadow bg-background">
        <div className="h-80 w-full my-auto flex items-center justify-center bg-neutral-100 dark:bg-background">
          <div className="flex flex-col gap-4 mx-4 text-center">
            <h1 className="font-bold text-3xl text-foreground">
              Email validado com sucesso!
            </h1>
            <Link
              href="/"
              className={cn(
                linkVariants({ variant: "button" }),
                "max-w-40 mx-auto",
                inputBorder,
              )}
            >
              Retornar
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen flex items-center justify-center border-y shadow-md bg-neutral-100 dark:bg-background">
      <form
        action={validateCodeAction}
        className="w-full max-w-120 flex flex-col gap-6 justify-center items-center px-8 py-16"
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
            <p className="text-xs font-medium text-muted-foreground">
              Código enviado para{" "}
              <strong className="text-foreground">{email}</strong>
            </p>
          )}
          <small className="text-[10px] min-[450px]:text-xs text-muted-foreground/75 font-medium">
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
            disabled={code.length < 6 || isPendingValidateCode}
            className={cn(
              buttonVariants(),
              "h-8 w-full text-xs min-[450px]:h-10 min-[450px]:text-base flex-1 rounded",
            )}
          >
            {isPendingValidateCode && <Spinner />} Confirmar
          </Button>
        </div>
        <FieldsetError error={validateCodeState.error?.form?.errors} />
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
    </div>
  );
}

const RenewCodeButton = ({
  onClick,
  isResending,
  countdown,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isResending: boolean;
  countdown: number;
}) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
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
    Reenviar código {countdown > 0 && countdown}
  </Button>
);
