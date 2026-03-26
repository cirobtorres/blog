import React from "react";
import {
  Fieldset,
  FieldsetError,
  FieldsetGeneratePassword,
  FieldsetInput,
  FieldsetLabel,
  FieldsetPassTypeBtn,
  PasswordStrength,
} from "..";
import CopyToClipBoard from "../../CopyToClipBoard";
import { ZxcvbnResult } from "@zxcvbn-ts/core";

export function FieldsetPassword({
  ref,
  value,
  onChange,
  passErrors,
  strength,
  strErrors,
  copyToClipboard,
  genPassword,
}: {
  ref: React.RefObject<null>;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  passErrors: string[];
  strErrors: string[];
  strength?: ZxcvbnResult;
  copyToClipboard?: boolean;
  genPassword?: boolean;
}) {
  const [type, setType] = React.useState<"text" | "password">("password");
  return (
    <>
      <Fieldset error={!!passErrors}>
        <FieldsetInput
          ref={ref}
          id="password"
          name="password"
          type={type}
          maxLength={32}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          // error={!!passErrors}
        />
        {copyToClipboard && (
          <CopyToClipBoard
            toCopy={value}
            className="max-[400px]:hidden absolute top-1/2 -translate-y-1/2 right-25.25"
          />
        )}
        {genPassword && (
          <FieldsetGeneratePassword
            inputRef={ref}
            setState={onChange}
            className="absolute top-1/2 -translate-y-1/2 right-9.25"
          />
        )}
        <FieldsetPassTypeBtn inputRef={ref} state={type} setState={setType} />
        <FieldsetLabel
          htmlFor="password"
          label="Senha"
          // error={!!passErrors}
        />
      </Fieldset>
      <FieldsetError error={passErrors} />
      <FieldsetError error={strErrors} />
      {strength && <PasswordStrength strength={strength.score} />}
      {strength &&
        strength.feedback.warning !== null &&
        strength?.feedback.suggestions !== null && (
          <ul className="mx-2">
            <li className="text-xs font-medium text-red-500">
              {strength?.feedback.warning}
            </li>
            {strength?.feedback.suggestions.map((text, i) => (
              <li key={i} className="text-xs font-medium text-amber-500">
                {text}
              </li>
            ))}
            {strength?.score === 4 && (
              <li className="text-xs text-center font-medium text-emerald-500">
                Senha forte
              </li>
            )}
          </ul>
        )}
    </>
  );
}
