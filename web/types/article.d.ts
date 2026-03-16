type ArticleState = {
  ok: boolean;
  success: string | null;
  error: ZodError<{
    email: string;
    password: string;
  }>;
  data: {
    id: string;
    link: string;
    updated_at: Date;
  } | null;
};
