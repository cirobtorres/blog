import ForgetForm from "../../../../components/Users/Forget/ForgetForm";
import { publicWebUrls } from "../../../../routing/routes";
import { cn, linkVariants } from "../../../../utils/variants";

export default async function ForgotPasswordPage() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center shadow bg-stone-150 dark:bg-stone-950">
      <div className="w-full not-dark:shadow bg-stone-100 dark:bg-stone-925 border-y">
        <div className="w-full max-w-120 mx-auto px-4 sm:px-8 py-8 flex flex-col items-center justify-center">
          <ForgetForm />

          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
            Para voltar para o login, clique{" "}
            <a
              href={publicWebUrls.signIn}
              className={cn(
                linkVariants({ variant: "internal" }),
                "text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2",
              )}
            >
              aqui
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
