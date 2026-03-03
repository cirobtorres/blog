type SignUpActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    name: string;
    email: string;
    password: string;
    strength: number;
  }>;
};

type SignInActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    email: string;
    password: string;
  }>;
};

type ValidateEmailActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    code: string;
  }>;
};

type ActionStateError = Record<string, { errors: string[] }>;
