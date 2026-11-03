type ActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<ActionStateError> | null;
  data:
    | Record<string, string>
    | Record<Blocks[]>
    | StoredObject[]
    | PageableTag
    | PageableMedia
    | null;
};

type ActionStateError = Record<string, { errors: string[] }>;

type BlogButton = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
