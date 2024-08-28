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

  if (Object.keys(errors).length) return { ...errors };

  revalidatePath("/", "layout");
  redirect("/");
};

const signOut = async () => {
  const supabase = createClient();

  const { error: backendError } = await supabase.auth.signOut();

  if (backendError) {
    throw new Error(`${backendError.status} ${backendError.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
};

const signInWithGoogle = async () => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

const signInWithFacebook = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export { signIn, signOut, signInWithGoogle, signInWithFacebook };
