type ArticleState = {
  ok: boolean;
  success: string | null;
  error: ZodError<ActionStateError>;
  data: Record<string, string> | Record<Blocks[]> | null;
};
