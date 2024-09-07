"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = createClient();

  const { error: backendError } = await supabase.auth.signOut();

  if (backendError) {
    throw new Error(`${backendError.status} ${backendError.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
};

const signIn = async (state: {}, formData: FormData) => {
  // let errors = { ...state };
  let errors = {};

  if (Object.keys(errors).length) return { ...errors };
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const captchaToken = (formData.get("captcha-token") as string) || undefined;
  const privacyPolicy = formData.get("privacy-policy");

  if (!privacyPolicy) {
    Object.assign(errors, {
      privacyPolicies:
        "Preciso que concorde com nossas políticas de dados e privacidade. Não se preocupe, não enviamos e-mails!",
    });
  }

  if (!captchaToken) {
    Object.assign(errors, {
      captchaToken: "Prove que você é humano! 🤖",
    });
  }

  const { error: backendError } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });

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

const signInWithGithub = async () => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export {
  signOut,
  signIn,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
};
