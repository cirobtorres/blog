"use server";

const defaultState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

const signUp = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const returnState = { ok: false, success: null, error: null, data: null };
  const { name, email, password } = Object.fromEntries(formData.entries());
  const userEmail = String(email);
  const userPassword = String(password);
  const userName = String(name).trim();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 409) {
        return {
          ...returnState,
          error: { email: { errors: ["Este e-mail já está em uso."] } },
        };
      }
      console.log(response.status);
      throw new Error("Erro no registro do servidor");
    }
  } catch (e) {
    console.error("signUp error:", e);
    return {
      ...returnState,
      error: { form: { errors: ["Falha de conexão com o servidor."] } },
    };
  }
  return { ...defaultState, ok: true };
};

export { signUp };
