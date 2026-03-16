type BaseInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  error?: boolean;
  className?: string;
};

type BaseTextareaProps = Omit<
  React.ComponentProps<"textarea">,
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

type ControlledTextareaProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>;
};

type UncontrolledTextareaProps = {
  value?: never;
  onChange?: never;
};

type FieldsetInputProps =
  | (BaseInputProps & ControlledTextareaProps)
  | (BaseInputProps & UncontrolledTextareaProps);

type FieldsetTextareaProps =
  | (BaseTextareaProps & ControlledTextareaProps)
  | (BaseTextareaProps & UncontrolledTextareaProps);
