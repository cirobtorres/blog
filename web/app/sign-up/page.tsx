import { Suspense } from "react";
import { Link } from "../../components/Links";
import { Skeleton } from "../../components/Skeleton";
import SignUpForm from "../../components/SignUpForm";
import LoginProviders from "../../components/LoginProviders";
import { webUrls } from "../../urls";

const SignUpFormLoad = () => (
  <div className="flex flex-col justify-center gap-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-10 flex items-center" />
    ))}
    <Skeleton className="w-full h-1.5 rounded-full" />
    <Skeleton className="w-full h-10.5" />
  </div>
);

export default function SignUpPage() {
  return (
    <main className="h-full min-h-screen grid sm:grid-cols-[1fr_500px_1fr] bg-border dark:bg-black">
      <div className="h-full min-h-screen px-4 sm:px-8 py-8 col-start-2 flex flex-col gap-2 shadow bg-background">
        <Link href="/" className="mx-auto">
          LOGO
        </Link>

        <h1 className="text-foreground text-3xl font-bold mb-8">Cadastrar</h1>

        <Suspense fallback={SignUpFormLoad()}>
          <SignUpForm />
        </Suspense>

        <div className="flex items-center">
          <hr className="w-full" />
          <span className="text-sm text-muted-foreground pointer-events-none mx-2">
            ou
          </span>
          <hr className="w-full" />
        </div>

        <LoginProviders />

        <p className="text-xs font-medium text-muted-foreground">
          Se você já possui uma conta, clique{" "}
          <Link
            href="/sign-in"
            className="text-xs underline underline-offset-2 text-primary"
          >
            aqui
          </Link>
          .
        </p>

        <hr />

        <p className="text-xs font-medium text-muted-foreground">
          As contas criadas aqui são para fins de interação com o autor deste
          website, especialmente por meio de comentários nas publicações, e
          podem ser excluídas facilmente a qualquer momento.
        </p>

        <p className="text-xs font-medium text-muted-foreground">
          Não armazenamos no banco mais que o necessário, como nome e e-mail, e{" "}
          <b className="font-extrabold">
            não enviamos e-mails insuportáveis de newsletters ou promocionais
          </b>
          .
        </p>

        {/* <p className="text-xs font-medium text-muted-foreground">
          Para mais informações, entrar em contato por meio do{" "}
          <Link
            href="/contact"
            className="text-xs underline underline-offset-2 text-primary"
          >
            link
          </Link>
          .
        </p> */}

        <p className="text-xs font-medium text-muted-foreground">
          O código deste site está disponível no{" "}
          <Link
            href={webUrls.myGithub}
            className="text-xs underline underline-offset-2 text-primary"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
