type ActionState = {
  ok: boolean;
  success: string | null;
  error: ZodError<ActionStateError> | null;
  data: Record<string, string> | Record<Blocks[]> | Cloudinary[] | null;
};
