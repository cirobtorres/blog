import generator from "generate-password-ts";
import { SetStateAction } from "react";
import { cn, focusRing, inputBorder } from "../../utils/className";
import { Score } from "@zxcvbn-ts/core";

const Fieldset = ({
  className,
  ...props
}: React.ComponentProps<"fieldset"> & {
  className?: string;
}) => {
  return (
    <fieldset
      {...props}
      className={cn(
        "relative w-full duration-300 rounded bg-neutral-900 group",
        "has-disabled:[&_input]:cursor-not-allowed has-disabled:[&_input]:[&_label]:text-neutral-600 has-disabled:[&_input]:bg-[#1f1f1f]",
        className,
      )}
    />
  );
};

const FieldsetInput = ({ error, className, ...props }: FieldsetInputProps) => (
  <input
    {...props}
    autoComplete="off"
    placeholder={props.placeholder ?? ""}
    className={cn(
      "h-full w-full px-2 pt-4.5 pb-1 text-xs font-medium rounded peer transition-[border,transform,box-shadow] duration-300 placeholder:text-transparent placeholder:select-none text-foreground/50 bg-transparent focus:placeholder:text-muted-foreground/50 disabled:cursor-not-allowed peer",
      focusRing,
      error
        ? "border border-destructive disabled:bg-destructive/25 disabled:border-destructive"
        : inputBorder,
      className,
    )}
  />
);

const FieldsetLabel = ({
  label,
  error,
  className,
  ...props
}: React.ComponentProps<"label"> & {
  label: string;
  error?: boolean;
  className?: string;
}) => (
  <label
    {...props}
    className={cn(
      "absolute origin-left top-1/2 z-10 start-1 px-1 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 scale-75 peer-focus:-translate-y-4.5 peer-focus:scale-75 text-foreground peer-focus:text-foreground peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-foreground peer-disabled:text-neutral-600",
      error &&
        "text-destructive peer-focus:text-destructive peer-placeholder-shown:text-destructive",
      className,
    )}
  >
    {label}
  </label>
);

const FieldsetPassTypeBtn = ({
  state,
  setState,
  inputRef,
}: {
  state: "password" | "text";
  setState: (value: SetStateAction<"text" | "password">) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        setState((state) => {
          if (state === "password") return "text";
          else return "password";
        });
        requestAnimationFrame(() => {
          const el = inputRef?.current;
          if (!el) return;

          el.focus();
          const len = el.value.length;
          el.setSelectionRange(len, len);
        });
      }}
      className={cn(
        "cursor-pointer absolute top-1/2 -translate-y-1/2 right-1 size-7 flex items-center justify-center transition-[border,box-shadow] duration-300 rounded dark:bg-neutral-900 group/passHideButton",
        inputBorder,
        focusRing,
      )}
    >
      {state !== "password" ? (
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
          className="transition-colors duration-300 size-4 stroke-muted-foreground dark:group-hover/passHideButton:stroke-neutral-400"
        >
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ) : (
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
          className="transition-colors duration-300 size-4 stroke-muted-foreground dark:group-hover/passHideButton:stroke-neutral-400"
        >
          <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
          <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
          <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
          <path d="m2 2 20 20" />
        </svg>
      )}
    </button>
  );
};

const FieldsetGeneratePassword = ({
  text,
  setState,
  inputRef,
  className,
}: {
  text?: string;
  setState: (value: SetStateAction<string>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  className?: string;
}) => (
  <button
    type="button"
    onClick={() => {
      setState(
        generator.generate({
          length: 16,
          numbers: true,
          symbols: true,
          uppercase: true,
          lowercase: true,
          strict: true, // Garantees all rules
        }),
      );
      requestAnimationFrame(() => {
        const el = inputRef?.current;
        if (!el) return;

        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
      });
    }}
    className={cn(
      "cursor-pointer inline-flex items-center text-center text-nowrap text-xs text-muted-foreground font-medium h-7 space-x-2 px-2 py-1.25 max-w-20 transition-[color,border,box-shadow] duration-300 rounded dark:hover:text-neutral-400 dark:bg-neutral-900",
      inputBorder,
      focusRing,
      className,
    )}
  >
    <span className="truncate">{text ?? "Sugerir"}</span>
  </button>
);

const FieldsetError = ({
  error,
  className,
}: {
  error?: string[];
  className?: string;
}) =>
  error &&
  error.length > 0 && (
    <ul className={cn("text-sm text-destructive", className)}>
      {error.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );

const FieldsetPassValidation = ({ password }: { password: string }) => {
  const upper = password.match(/[A-Z]/g);
  const lower = password.match(/[a-z]/g);
  const digit = password.match(/[0-9]/g);
  const symbol = password.match(/[\W]/g);

  const aaa = [
    {
      val: upper,
      text: "maiúscula",
    },
    {
      val: lower,
      text: "minúscula",
    },
    {
      val: digit,
      text: "dígito",
    },
    {
      val: symbol,
      text: "símbolo",
    },
  ];
  return (
    <ul className="grid grid-cols-1 gap-px">
      {aaa.map(({ val, text }, i) => (
        <li
          key={i}
          className="h-4 grid grid-col-[16px_1fr] justify-start items-center"
        >
          <Validated
            className={cn(
              "invisible col-start-1 size-4 mx-1 stroke-emerald-500",
              val && "visible",
            )}
          />
          <span
            className={cn(
              "col-start-2 px-2 text-xs text-muted-foreground font-medium",
              val && "text-emerald-500",
            )}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
};

const PasswordStrength = ({ strength }: { strength: Score }) => {
  const percentage = (strength / 4) * 100;

  const getStr = (srt: number) => {
    switch (srt) {
      case 1:
        return "oklch(63.7% 0.237 25.331)";
      case 2:
        return "oklch(70.5% 0.213 47.604)";
      case 3:
        return "oklch(79.5% 0.184 86.047)";
      case 4:
        return "oklch(69.6% 0.17 162.48)";
      default:
        return "transparent";
    }
  };

  const color = getStr(strength);

  return (
    <div className="w-full inline-grid">
      <div
        className="col-start-1 row-start-1 w-0 h-1 m-px rounded-full transition-width duration-300"
        style={{
          width: percentage + "%",
          backgroundColor: color,
        }}
      />
      <div
        className="col-start-1 row-start-1 w-0 h-1 m-px rounded-full blur-[2px] transition-width duration-300"
        style={{ width: percentage + "%", backgroundColor: color }}
      />
      <div className="col-start-1 row-start-1 w-full h-1.5 border rounded-full" />
    </div>
  );
};

const Validated = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetPassTypeBtn,
  FieldsetGeneratePassword,
  FieldsetPassValidation,
  PasswordStrength,
  FieldsetError,
};
