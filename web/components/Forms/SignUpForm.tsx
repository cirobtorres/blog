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

export default function SignUpForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [termsDialog, setTermsDialog] = React.useState(false);
  const [termsCheckbox, setTermsCheckbox] = React.useState(true);
  const passRef = React.useRef(null);

  const options = {
    translations,
  };
  zxcvbnOptions.setOptions(options);
  const strength = zxcvbn(password);

  const [state, action, isPending] = React.useActionState(
    async (prevState: ActionState) => {
      const formData = new FormData();

      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("termsCheckbox", String(termsCheckbox));
      formData.set("strength", strength.score.toString());

      return await signUp(prevState, formData);
    },
    {
      ok: false,
      success: null,
      error: {
        name: {
          errors: null,
        },
        email: {
          errors: null,
        },
        password: {
          errors: null,
        },
        strength: {
          errors: null,
        },
        termsCheckbox: {
          errors: null,
        },
      },
      data: null,
    },
  );

  return (
    <form action={action} className="w-full flex flex-col justify-center gap-2">
      <Fieldset error={!!state.error.name?.errors}>
        <FieldsetInput
          id="name"
          value={name}
          placeholder="John Doe"
          maxLength={65}
          onChange={(e) => setName(e.target.value)}
          error={state.error.name?.errors}
        />
        <FieldsetLabel
          htmlFor="name"
          label="Nome"
          // error={!!state.error.name?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.name?.errors} />
      <Fieldset error={!!state.error.email?.errors}>
        <FieldsetInput
          id="email"
          type="email"
          value={email}
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          className="truncate"
          error={state.error.email?.errors}
        />
        <FieldsetLabel
          htmlFor="email"
          label="E-mail"
          // error={!!state.error.email?.errors}
        />
      </Fieldset>
      <FieldsetError error={state.error.email?.errors} />
      <FieldsetPassword
        ref={passRef}
        value={password}
        onChange={setPassword}
        strength={strength}
        copyToClipboard
        genPassword
        passErrors={state.error.password?.errors}
        strErrors={state.error.strength?.errors}
      />
      <fieldset className="flex items-start gap-2">
        <Checkbox
          id="terms-checkbox"
          name="terms-checkbox"
          checked={termsCheckbox}
          aria-invalid={!!state.error.termsCheckbox?.errors}
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
      <FieldsetError error={state.error?.termsCheckbox?.errors} />
      <FieldsetError error={state.error?.form?.errors} />
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
      <AlertDialogDescription className="sr-only">TODO</AlertDialogDescription>
      <div className="max-h-100 m-2 p-4 overflow-y-auto scrollbar">
        <Terms />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel className="w-full max-w-30 h-8">
          Voltar
        </AlertDialogCancel>
        <AlertDialogAction onClick={action} className="w-full max-w-30 h-8">
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
