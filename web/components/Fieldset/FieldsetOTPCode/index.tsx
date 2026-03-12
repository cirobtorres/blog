"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../InputOTP";
import React from "react";

const FieldsetOTPCode = ({
  value,
  onChange,
  pending,
  invalid,
  inputRef,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  invalid?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <fieldset className="flex flex-col justify-center items-center gap-2">
      <label htmlFor="code" className="text-xs font-bold text-neutral-500">
        Código de verificação
      </label>
      <InputOTP
        ref={inputRef}
        id="code"
        name="code"
        maxLength={6}
        aria-invalid={invalid}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={value}
        onChange={(v) => onChange(v.toUpperCase())}
        disabled={pending}
      >
        <InputOTPGroup className="*:data-[slot=input-otp-slot]:min-[450px]:h-12 *:data-[slot=input-otp-slot]:min-[450px]:w-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={Number(index)}
              aria-invalid={invalid}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </fieldset>
  );
};

export default FieldsetOTPCode;
