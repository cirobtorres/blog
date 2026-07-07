import { cn, linkVariants } from "../../../../../utils/variants";

export default function VerifyEmailSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-xl shadow border border-neutral-200 dark:border-neutral-800 flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
          Conta Ativada!
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Seu e-mail foi verificado com sucesso. Agora você já pode acessar
          todas as funcionalidades da plataforma.
        </p>
        <a
          href="/users/sign-in"
          className={cn(
            linkVariants({ variant: "internal" }),
            "w-full bg-primary text-white p-2.5 rounded font-medium text-sm text-center block",
          )}
        >
          Ir para o Login
        </a>
      </div>
    </main>
  );
}
