export default function ValidateEmailPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-neutral-900 p-8 rounded-xl shadow border border-neutral-200 dark:border-neutral-800 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50">
          Verifique seu E-mail 📧
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Acabamos de enviar um link de confirmação para o seu e-mail. Por
          favor, verifique sua caixa de entrada (e a pasta de spam).
        </p>
        <div className="mt-4">
          <a href="/users/sign-in">Voltar para o Login</a>
        </div>
      </div>
    </main>
  );
}
