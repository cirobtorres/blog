type BaseInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  error?: boolean;
  className?: string;
};

type ControlledInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

type UncontrolledInputProps = {
  value?: never;
  onChange?: never;
};

type FieldsetInputProps =
  | (BaseInputProps & ControlledInputProps)
  | (BaseInputProps & UncontrolledInputProps);
