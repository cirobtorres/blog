import LoginProviders from "../../../components/LoginProviders";
import { Link } from "../../../components/Links";
import { publicWebUrls } from "../../../config/routes";
import { Hr, Separation, SignUpInfo } from "../../../components/utils";
import { Alert } from "../../../components/Alert";
import SignInForm from "../../../components/Forms/SignInForm";

export default async function SignInPage({ searchParams }: PageProps) {
  const { login } = await searchParams;
  return (
    <main className="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      <div className="w-full h-full min-h-screen px-4 min-[700px]:px-8 py-8 min-[700px]:border-r not-dark:shadow">
        <div className="max-w-125 mx-auto h-full flex flex-col justify-center gap-2">
          <Link href="/" className="ml-0 mr-auto mb-4">
            Home
          </Link>

          <h1 className="text-neutral-900 dark:text-neutral-100 text-3xl font-bold mb-8">
            Login
          </h1>

          {login === "required" && (
            <Alert title="Negado" variant="alert">
              Para acessar essa rota, você precisa estar logado.
            </Alert>
          )}

          <SignInForm />

          <Link
            href={publicWebUrls.forget}
            className="mx-auto text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
          >
            Esqueci minha senha
          </Link>

          <Separation />

          <LoginProviders />

          <p className="text-xs font-medium text-neutral-500">
            Para se cadastrar, clique{" "}
            <Link
              href={publicWebUrls.signUp}
              className="text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
            >
              aqui
            </Link>
            .
          </p>

          <Hr />

          <SignUpInfo />
        </div>
      </div>
      <div className="grayscale [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),radial-gradient(circle,rgba(255,255,255,0.0),rgba(255,255,255,0.25)),url('https://store-images.s-microsoft.com/image/apps.20650.14336626908214534.584cecb6-3f58-4dd3-9758-900c83416f32.aacd9cd9-55fe-43b1-a452-49dad64f4772')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://store-images.s-microsoft.com/image/apps.20650.14336626908214534.584cecb6-3f58-4dd3-9758-900c83416f32.aacd9cd9-55fe-43b1-a452-49dad64f4772')]" />
    </main>
  );
}
