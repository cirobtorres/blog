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
  const { name, email, password } = Object.fromEntries(formData.entries());

  const userName = String(name).trim();
  const userEmail = String(email).trim().toLowerCase();
  const userPassword = String(password);

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
        cache: "no-store",
      },
    );

    if (response.ok) {
      return { ...defaultState, ok: true };
    }

    const body = await response.json().catch(() => null);
    const message = body?.message;

    if (response.status === 409) {
      return {
        ...defaultState,
        error: {
          email: {
            errors: [message ?? "Este e-mail já está em uso."],
          },
        },
      };
    }

    if (response.status === 400) {
      return {
        ...defaultState,
        error: {
          password: {
            errors: [
              message ??
                "A senha não atende à política de segurança configurada.",
            ],
          },
        },
      };
    }

    return {
      ...defaultState,
      error: {
        form: {
          errors: [message ?? "Erro inesperado ao criar conta."],
        },
      },
    };
  } catch (e) {
    console.error("signUp error:", e);

    return {
      ...defaultState,
      error: {
        form: {
          errors: ["Falha de conexão com o servidor."],
        },
      },
    };
  }
};

export { signUp };

// "use server";

// const defaultState = {
//   ok: false,
//   success: null,
//   error: null,
//   data: null,
// };

// const signUp = async (
//   prevState: ActionState,
//   formData: FormData,
// ): Promise<ActionState> => {
//   const returnState = { ok: false, success: null, error: null, data: null };
//   const { name, email, password } = Object.fromEntries(formData.entries());
//   const userEmail = String(email);
//   const userPassword = String(password);
//   const userName = String(name).trim();

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: userName,
//           email: userEmail,
//           password: userPassword,
//         }),
//       },
//     );

//     if (!response.ok) {
//       if (response.status === 409) {
//         return {
//           ...returnState,
//           error: { email: { errors: ["Este e-mail já está em uso."] } },
//         };
//       }
//       console.log(response.status);
//       throw new Error("Erro no registro do servidor");
//     }
//   } catch (e) {
//     console.error("signUp error:", e);
//     return {
//       ...returnState,
//       error: { form: { errors: ["Falha de conexão com o servidor."] } },
//     };
//   }
//   return { ...defaultState, ok: true };
// };

// export { signUp };
