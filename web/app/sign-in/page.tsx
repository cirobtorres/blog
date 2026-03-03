import SignInForm from "../../components/SignInForm";
import LoginProviders from "../../components/LoginProviders";
import { Link } from "../../components/Links";
import { webUrls } from "../../urls";

export default function SignInPage() {
  return (
    <main className="h-full min-h-screen grid sm:grid-cols-[1fr_500px_1fr] bg-border dark:bg-black">
      <div className="h-full min-h-screen px-4 sm:px-8 py-8 col-start-2 flex flex-col gap-2 shadow bg-background">
        <Link href="/" className="mx-auto">
          LOGO
        </Link>

        <h1 className="text-foreground text-3xl font-bold mb-8">Login</h1>

        <SignInForm />

        <Link
          href="/forget"
          className="mx-auto text-xs underline underline-offset-2 text-primary"
        >
          Esqueci minha senha
        </Link>

        <div className="flex items-center">
          <hr className="w-full" />
          <span className="text-sm text-muted-foreground pointer-events-none mx-2">
            ou
          </span>
          <hr className="w-full" />
        </div>

        <LoginProviders />

        <p className="text-xs font-medium text-muted-foreground">
          Se gostaria de criar uma conta dedicada, clique{" "}
          <Link
            href="/sign-up"
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
          <u className="underline-offset-2">
            não enviamos e-mails insuportáveis de newsletters ou promocionais
          </u>
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
