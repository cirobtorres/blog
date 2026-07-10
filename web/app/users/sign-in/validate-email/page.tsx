import { cn, linkVariants } from "../../../../utils/variants";

export default function ValidateEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div className="w-full flex items-center justify-center p-8 border-y not-dark:shadow bg-stone-100 dark:bg-stone-900">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 text-pretty">
            Verifique seu E-mail
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-pretty">
            Foi enviado um link de confirmação para seu e-mail. Verifique sua
            caixa de entrada e também a pasta de spam.
          </p>
          <a
            href="/users/sign-in"
            className={cn(
              linkVariants({ variant: "external" }),
              "max-w-40 mx-auto",
            )}
          >
            Voltar para o Login
          </a>
        </div>
      </div>
    </main>
  );
}
