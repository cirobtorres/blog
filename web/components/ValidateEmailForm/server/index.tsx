"use server";

import { notFound } from "next/navigation";
import getUser from "../../../services/auth/session/server/getUser";
import ValidateEmailFormClient from "../client";

export default async function ValidateEmailFormServer({
  step,
}: {
  step?: string | string[] | undefined;
}) {
  const { ok, data: user } = await getUser();
  if (!ok) notFound(); // Not authenticated
  if (step !== "success" && user.isProviderEmailVerified) notFound(); // Authenticated + search params + verified
  return <ValidateEmailFormClient email={user.providerEmail} />; // Authenticated + unverified
}
