// Sending email to request password change
type ForgetEmailPassActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    email: string;
    password: string;
  }>;
};

// Confirming password code
type PassChangeCodeActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    email: string;
    password: string;
  }>;
};

type PassChangePermissionActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    form: string;
  }>;
};

type PassChangeActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    password: string;
  }>;
};
