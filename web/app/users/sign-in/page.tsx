import SignInForm from "../../../components/SignInForm";
import LoginProviders from "../../../components/LoginProviders";
import { Link } from "../../../components/Links";
import { publicWebUrls } from "../../../config/routes";
import { SignUpInfo } from "../../../components/utils";
import { Alert } from "../../../components/Alert";

export default async function SignInPage({ searchParams }: PageProps) {
  const { login } = await searchParams;
  return (
    <main className="h-full min-h-screen grid sm:grid-cols-[1fr_500px_1fr] bg-border dark:bg-black">
      <div className="h-full min-h-screen px-4 sm:px-8 py-8 col-start-2 flex flex-col justify-center gap-2 shadow border-x bg-background">
        <Link href="/" className="ml-0 mr-auto">
          Home
        </Link>

        <h1 className="text-foreground text-3xl font-bold mb-8">Login</h1>

        {login === "required" && (
          <Alert type="error">
            Para acessar esta rota, você precisa estar logado.
          </Alert>
        )}

        <SignInForm />

        <Link
          href={publicWebUrls.forget}
          className="text-primary mx-auto underline underline-offset-2"
        >
          Esqueci minha senha
        </Link>

        <div className="w-full flex items-center">
          <hr className="w-full" />
          <span className="text-sm text-muted-foreground pointer-events-none mx-2">
            ou
          </span>
          <hr className="w-full" />
        </div>

        <LoginProviders />

        <p className="text-xs font-medium text-muted-foreground">
          Para se cadastrar, clique{" "}
          <Link
            href={publicWebUrls.signUp}
            className="text-xs underline underline-offset-2 text-primary"
          >
            aqui
          </Link>
          .
        </p>

        <hr className="w-full" />

        <SignUpInfo />
      </div>
    </main>
  );
}
