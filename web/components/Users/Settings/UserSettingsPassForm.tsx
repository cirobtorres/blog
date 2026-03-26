"use client";

import React from "react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { translations } from "@zxcvbn-ts/language-pt-br";
import { FieldsetPassword } from "../../Fieldset/FieldsetPassword";
import { Button } from "../../Button";

const initialState: ActionState = {
  ok: false,
  success: null,
  error: { password: { errors: null } },
  data: null,
};

export default function UserSettingsPassForm() {
  const [password, setPassword] = React.useState("");
  const passRef = React.useRef(null);
  const options = {
    translations,
  };
  zxcvbnOptions.setOptions(options);
  const strength = zxcvbn(password);

  const [state, action, isPending] = React.useActionState(async () => {
    return { ...initialState, ok: true, success: "Verifique seu email" };
  }, initialState);

  return (
    <form
      action={action}
      className="flex flex-col gap-2 flex-1 p-4 rounded-lg border bg-stone-900"
    >
      <h2 className="text-neutral-500">Mudança de Senha</h2>
      <div className="flex items-center gap-2">
        <div className="w-full">
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
        </div>
        <Button
          type="submit"
          variant="default"
          disabled={isPending}
          className="ml-auto mb-auto w-full max-w-30 h-9.5"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
