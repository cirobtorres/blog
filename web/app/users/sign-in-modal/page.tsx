import { redirect } from "next/navigation";

export default function SignInModalRedirectPage() {
  redirect("/users/sign-in");
}
