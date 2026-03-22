"use server";

import { cookies } from "next/headers";
import ForgetForm from "../../../../components/Forms/ForgetForm";
import { Link } from "../../../../components/Links";
import { publicWebUrls } from "../../../../routing/routes";

export default async function ForgotPasswordPage() {
  const cookieStore = await cookies();
  const resetPassToken = cookieStore.has("reset_password_token");
  return (
    <main className="w-full min-h-screen flex justify-center items-center shadow bg-stone-150 dark:bg-stone-950">
      <div className="w-full not-dark:shadow bg-stone-100 dark:bg-stone-925 border-y">
        <div className="w-full max-w-120 mx-auto px-4 sm:px-8 py-8 flex flex-col items-center justify-center">
          <ForgetForm hasToken={resetPassToken} />

          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
            Se você já possui uma conta, clique{" "}
            <Link
              href={publicWebUrls.signIn}
              className="text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
            >
              aqui
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
