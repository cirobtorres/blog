"use client";

import { translations } from "@zxcvbn-ts/language-pt-br";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import React from "react";
import {
  Fieldset,
  FieldsetError,
  FieldsetInput,
  FieldsetLabel,
} from "../Fieldset";
import Spinner from "../Spinner";
import { signUp } from "../../services/auth/signUp";
import { Checkbox } from "../Fieldset/Checkbox";
import { FieldsetPassword } from "../Fieldset/FieldsetPassword";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../AlertDialog";
import { cn, focusRing } from "../../utils/variants";
import { Button } from "../Button";
import { P } from "../Typography";
import * as z from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Pelo menos 3 caracteres")
    .max(65, "Nome muito longo"),
  email: z.email("E-mail inválido").trim().toLowerCase(),
  password: z.string().min(8, "Mínimo de 6 e máximo de 32 caracteres"),
  strength: z.number().min(4, "Senha muito fraca"),
  termsCheckbox: z.refine((value) => value === "on", {
    message: "Você precisa concordar com as políticas de uso de dados",
  }),
});

interface ZodReturnError {
  name?: { errors: string[] } | undefined;
  email?: { errors: string[] } | undefined;
  password?: { errors: string[] } | undefined;
  strength?: { errors: string[] } | undefined;
  termsCheckbox?: { errors: string[] } | undefined;
}

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function SignUpForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [termsDialog, setTermsDialog] = React.useState(false);
  const [termsCheckbox, setTermsCheckbox] = React.useState(true);
  const [errors, setErrors] = React.useState<ZodReturnError | undefined>(
    undefined,
  );
  const passRef = React.useRef(null);

  const options = {
    translations,
  };
  zxcvbnOptions.setOptions(options);
  const strength = zxcvbn(password);

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState, formData: FormData) =>
      await signUp(prevState, formData),
    defaultState,
  );

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const result = signUpSchema.safeParse({
      ...rawData,
      strength: Number(rawData.strength),
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
      <Fieldset error={!!errors?.name?.errors}>
        <FieldsetInput
          id="name"
          name="name"
          value={name}
          placeholder="John Doe"
          maxLength={65}
          onChange={(e) => setName(e.target.value)}
          error={!!errors?.name?.errors}
        />
        <FieldsetLabel htmlFor="name" label="Nome" />
      </Fieldset>
      <FieldsetError error={errors?.name?.errors} />
      <Fieldset error={!!errors?.email?.errors}>
        <FieldsetInput
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="truncate"
          error={!!errors?.email?.errors}
        />
        <FieldsetLabel htmlFor="email" label="E-mail" />
      </Fieldset>
      <FieldsetError error={errors?.email?.errors} />
      <FieldsetPassword
        ref={passRef}
        value={password}
        onChange={setPassword}
        strength={strength}
        copyToClipboard
        genPassword
        passErrors={errors?.password?.errors}
        strErrors={errors?.strength?.errors}
      />
      <fieldset className="flex items-start gap-2">
        <Checkbox
          id="terms-checkbox"
          name="termsCheckbox"
          checked={termsCheckbox}
          aria-invalid={!!errors?.termsCheckbox?.errors}
          onCheckedChange={(checked) => setTermsCheckbox(checked === true)}
        />
        <label
          htmlFor="terms-checkbox"
          className="text-xs text-neutral-900 dark:text-neutral-100 leading-4 font-medium select-none"
        >
          Ao clicar em confirmar, você concorda com as{" "}
          <Dialog
            trigger={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTermsDialog(!termsDialog);
            }}
            open={termsDialog}
            onOpenChange={setTermsDialog}
            action={() => setTermsCheckbox(true)}
          >
            Políticas de Privacidade e Uso de Dados
          </Dialog>{" "}
          do website.
        </label>
      </fieldset>
      <FieldsetError error={errors?.termsCheckbox?.errors} />
      <FieldsetError error={state?.error?.form?.errors} />
      <Button type="submit" disabled={isPending} className="rounded h-9.5">
        {isPending && <Spinner />} {isPending ? "Cadastrando" : "Confirmar"}
      </Button>
    </form>
  );
}

const Dialog = ({
  children,
  trigger,
  action,
  ...props
}: React.ComponentProps<typeof AlertDialog> & {
  children: string;
  trigger: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  action: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
  <AlertDialog {...props}>
    <AlertDialogTrigger asChild onClick={trigger}>
      <span
        role="button"
        tabIndex={0}
        className={cn(
          "cursor-pointer font-medium text-xs text-primary/75 hover:text-primary underline underline-offset-2 rounded transition-all duration-300",
          focusRing,
        )}
      >
        {children.toLowerCase()}
      </span>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>{children}</AlertDialogHeader>
      <AlertDialogDescription className="sr-only">
        Termos de proteção e uso de dados
      </AlertDialogDescription>
      <div className="max-h-100 m-2 p-4 overflow-y-auto scrollbar">
        <Terms />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel variant="outline" className="w-full max-w-30 h-8">
          Voltar
        </AlertDialogCancel>
        <AlertDialogAction
          variant="outline"
          onClick={action}
          className="w-full max-w-30 h-8"
        >
          Confirmar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const Terms = () => (
  <>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis,{" "}
      <b className="text-primary/75">
        saepe a atque maxime corrupti! Quidem soluta modi dolorem perspiciatis
        officiis corrupti est maxime
      </b>
      , facilis amet adipisci voluptatum, sapiente expedita. Nisi rerum
      voluptatum ullam aut consequuntur sequi minus tempore recusandae culpa sed
      facere saepe voluptates cumque doloribus, minima reiciendis maxime.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
    <P>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </P>
  </>
);
