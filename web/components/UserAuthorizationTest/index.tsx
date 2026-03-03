import { redirect } from "next/navigation";
import { getSessionUser } from "../../services/auth/session/server/authorizeUser";

export default async function UserAuthorizationTest({
  permission,
}: {
  permission?: "USER" | "AUTHOR"; // TODO: string[]
}) {
  const {
    authorized,
    redirect: redirectPath,
    user,
  } = await getSessionUser(permission ?? "USER");

  if (!authorized && redirectPath) {
    redirect(redirectPath);
  }

  const activeUser = user!;

  return <div>{activeUser.name}</div>;
}
