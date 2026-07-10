"use server";

import { notFound } from "next/navigation";
import ValidateEmailFormClient from "../client";
import { cookies } from "next/headers";

export default async function ValidateEmailFormServer({
  step,
}: {
  step?: string | string[] | undefined;
}) {
  const cookieStore = await cookies();
  const signupEmail = cookieStore.get("signup_email")?.value;
  // const { ok, data: user } = await getUser();
  // if (!ok) notFound(); // Not authenticated
  // if (step !== "success" && user.isProviderEmailVerified) notFound(); // Authenticated + search params + verified
  // return <ValidateEmailFormClient email={user.providerEmail} />; // Authenticated + unverified
  if (step !== "success" && !signupEmail) {
    notFound();
  }
  return <ValidateEmailFormClient email={signupEmail || ""} />;
}
