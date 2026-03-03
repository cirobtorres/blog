import { notFound } from "next/navigation";
import { getUser } from "../../../services/auth/session/server/getUser";
import ValidateEmailFormClient from "../client";

export default async function ValidateEmailFormServer() {
  const userData = await getUser();

  const { ok, data: user } = userData;

  console.log(user?.isProviderEmailVerified);

  if (!ok || user.isProviderEmailVerified) notFound();

  return <ValidateEmailFormClient email={user.email} />;
}
