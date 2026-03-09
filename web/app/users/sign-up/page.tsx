import { Suspense } from "react";
import { Link } from "../../../components/Links";
import { Skeleton } from "../../../components/Skeleton";
import SignUpForm from "../../../components/SignUpForm";
import LoginProviders from "../../../components/LoginProviders";
import { publicWebUrls } from "../../../config/routes";
import { Separation, SignUpInfo } from "../../../components/utils";
import { Alert } from "../../../components/Alert";

const SignUpFormLoad = () => (
  <div className="w-full flex flex-col justify-center gap-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-10 flex items-center" />
    ))}
    <Skeleton className="w-full h-1.5 rounded-full" />
    <div className="grid grid-cols-[14px_1fr] gap-2">
      <Skeleton className="w-full size-4 rounded" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-1/4 h-3.5" />
      </div>
    </div>
    <Skeleton className="w-full h-10.5" />
  </div>
);

export default function SignUpPage() {
  return (
    <main className="h-full min-h-screen grid sm:grid-cols-[1fr_500px_1fr] bg-border dark:bg-black">
      <div className="h-full min-h-screen px-4 sm:px-8 py-8 col-start-2 flex flex-col justify-center gap-2 shadow border-x bg-background">
        <Link href="/" className="ml-0 mr-auto">
          Home
        </Link>

        <h1 className="text-foreground text-3xl font-bold mb-8">Cadastrar</h1>

        <Alert type="warn">
          Este site está em construção. O banco poderá sofrer limpeza de tempos
          em tempos, o que significa que contas cadastradas aqui poderão ser
          apagadas no futuro.
        </Alert>

        <Suspense fallback={SignUpFormLoad()}>
          <SignUpForm />
        </Suspense>

        <Separation />

        <LoginProviders />

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

        <hr className="w-full" />

        <SignUpInfo />
      </div>
    </main>
  );
}
