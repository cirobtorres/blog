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
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import { cn, focusRing } from "../../utils/variants";
import { Button } from "../Button";

const SignUpForm = () => {
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

  const [state, action, pending] = React.useActionState(
    async (prevState: SignUpActionState) => {
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
          error={!!state.error.name?.errors}
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
          error={!!state.error.email?.errors}
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
          <AlertDialog open={termsDialog} onOpenChange={setTermsDialog}>
            <AlertDialogTrigger
              asChild
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setTermsDialog(!termsDialog);
              }}
            >
              <span
                role="button"
                tabIndex={0}
                className={cn(
                  "cursor-pointer font-medium text-xs text-primary/75 hover:text-primary underline underline-offset-2 rounded transition-[colors,box-shadow] duration-300",
                  focusRing,
                )}
              >
                políticas de privacidade e uso de dados
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-xs min-[400px]:max-w-100 min-[460px]:max-w-118.75 min-[550px]:max-w-lg min-[600px]:max-w-xl min-[800px]:max-w-3xl">
              <AlertDialogHeader className="flex items-center justify-between">
                <AlertDialogTitle className="text-xl">
                  Políticas de Privacidade e Uso de Dados
                </AlertDialogTitle>
                <AlertDialogCancel>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </AlertDialogCancel>
              </AlertDialogHeader>
              <AlertDialogDescription
                asChild
                className="max-h-100 overflow-y-auto scrollbar"
              >
                <div className="flex flex-col gap-4">
                  <Terms />
                </div>
              </AlertDialogDescription>
              <AlertDialogFooter className="p-2">
                <AlertDialogCancel className="h-fit py-1 w-24">
                  Voltar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => setTermsCheckbox(true)}
                  className="h-fit py-1 w-24"
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>{" "}
          do website.
        </label>
      </fieldset>
      <FieldsetError error={state.error?.termsCheckbox?.errors} />
      <FieldsetError error={state.error?.form?.errors} />
      <Button type="submit" disabled={pending} className="rounded h-10.5">
        {pending && <Spinner />} {pending ? "Cadastrando" : "Confirmar"}
      </Button>
    </form>
  );
};

export default SignUpForm;

const Terms = () => (
  <>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita.
    </p>
    <p>
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
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus
      veritatis soluta dolorum quae nisi laborum nobis voluptates veniam
      consectetur itaque ex, temporibus, error repudiandae quidem doloribus
      dolorem eligendi delectus omnis, saepe a atque maxime corrupti! Quidem
      soluta modi dolorem perspiciatis officiis corrupti est maxime, facilis
      amet adipisci voluptatum, sapiente expedita. Nisi rerum voluptatum ullam
      aut consequuntur sequi minus tempore recusandae culpa sed facere saepe
      voluptates cumque doloribus, minima reiciendis maxime. Illo, alias cum?
      Aliquid.
    </p>
  </>
);
