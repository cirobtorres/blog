"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signIn = async (state: {}, formData: FormData) => {
  // let errors = { ...state };
  let errors = {};
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error: backendError } = await supabase.auth.signInWithPassword(data);

  if (backendError) {
    if (
      backendError.status === 400 &&
      backendError.message === "Invalid login credentials"
    ) {
      Object.assign(errors, {
        invalidCredentials: "E-mail ou senha inválidos",
      });
    }
  }

  console.log(errors);

  if (Object.keys(errors).length) return { ...errors };

  revalidatePath("/", "layout");
  redirect("/");
};

export default signIn;
