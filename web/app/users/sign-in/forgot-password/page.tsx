"use server";

import { cookies } from "next/headers";
import ForgetForm from "../../../../components/ForgetForm";
import { Link } from "../../../../components/Links";
import { publicWebUrls } from "../../../../config/routes";

export default async function ForgotPasswordPage() {
  const cookieStore = await cookies();
  const resetPassToken = cookieStore.has("reset_password_token");
  return (
    <main className="w-full min-h-screen flex justify-center items-center shadow bg-white dark:bg-black">
      <div className="w-full border-y bg-background">
        <div className="w-full max-w-100 mx-auto px-4 sm:px-8 py-8 flex flex-col items-center justify-center">
          <ForgetForm hasToken={resetPassToken} />

          <p className="text-xs font-medium text-muted-foreground">
            Se você já possui uma conta, clique{" "}
            <Link
              href={publicWebUrls.signIn}
              className="text-xs underline underline-offset-2 text-primary"
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
