import generator from "generate-password-ts";
import { SetStateAction } from "react";
import { cn, focusRing } from "../../utils/variants";
import { Score } from "@zxcvbn-ts/core";

const Fieldset = ({
  className,
  error,
  ...props
}: React.ComponentProps<"fieldset"> & {
  className?: string;
  error?: boolean;
}) => {
  return (
    <fieldset
      {...props}
      aria-invalid={!!error}
      className={cn("relative w-full rounded not-dark:shadow group", className)}
    />
  );
};

const FieldsetInput = ({ error, className, ...props }: FieldsetInputProps) => (
  <input
    {...props}
    autoComplete="off"
    placeholder={props.placeholder ?? ""}
    aria-invalid={!!error}
    className={cn(
      "h-full w-full px-2 pt-4.25 pb-1 text-xs font-medium rounded peer transition-all duration-300 bg-transparent placeholder:text-transparent placeholder:select-none border peer",
      focusRing,
      error
        ? "text-neutral-100 border-destructive/50 bg-destructive/5 dark:bg-destructive/5 focus-visible:border-destructive/50 dark:focus-visible:border-destructive/50"
        : "text-neutral-900 dark:text-neutral-400 focus:placeholder:text-neutral-500 bg-stone-100 dark:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-150 dark:hover:bg-stone-750",
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
      "absolute origin-left top-1/2 z-10 inset-s-1 px-1.5 font-medium select-none text-sm pointer-events-none bg-transparent bg-opacity-50 transform transition-top duration-100 -translate-y-4.5 peer-focus:-translate-y-4.5 peer-placeholder-shown:-translate-y-1/2 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100",
      // To enable error, comment below
      "text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100",
      // error
      //   ? "text-destructive peer-focus:text-destructive peer-placeholder-shown:text-destructive"
      //   : "text-neutral-900 peer-focus:text-neutral-900 peer-placeholder-shown:text-neutral-900 dark:text-neutral-100 dark:peer-focus:text-neutral-100 dark:peer-placeholder-shown:text-neutral-100",
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
        "absolute top-1/2 -translate-y-1/2 right-1.25 size-7 cursor-pointer flex items-center justify-center not-dark:shadow transition-all duration-300 border rounded dark:border-stone-700 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 dark:hover:border-stone-650 dark:hover:bg-stone-750 focus-visible:border-stone-300 dark:focus-visible:border-stone-650",
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
          className="transition-colors duration-300 size-4"
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
          className="transition-colors duration-300 size-4"
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
      "cursor-pointer inline-flex items-center text-center text-nowrap text-xs font-medium h-7 space-x-2 px-2 py-1.25 max-w-24 border rounded not-dark:shadow transition-all duration-300 dark:border-stone-700 text-neutral-900 dark:text-neutral-100 bg-stone-100 dark:bg-stone-800 dark:hover:border-stone-650 dark:hover:bg-stone-750 focus-visible:border-stone-300 dark:focus-visible:border-stone-650",
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
    <div className="w-full inline-grid overflow-hidden rounded-full not-dark:shadow">
      <div
        className="z-10 col-start-1 row-start-1 w-0 h-1 m-px rounded-full transition-width duration-300"
        style={{
          width: percentage + "%",
          backgroundColor: color,
        }}
      />
      <div className="col-start-1 row-start-1 w-full h-1.5 rounded-full border bg-stone-100 dark:bg-stone-800" />
    </div>
  );
};

export {
  Fieldset,
  FieldsetInput,
  FieldsetLabel,
  FieldsetPassTypeBtn,
  FieldsetGeneratePassword,
  PasswordStrength,
  FieldsetError,
};
