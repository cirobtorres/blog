import { externalUrls } from "../config/routes";
import { Link } from "./Links";

const Separation = () => (
  <div className="w-full flex items-center">
    <hr className="w-full" />
    <span className="text-sm text-muted-foreground pointer-events-none mx-2">
      ou
    </span>
    <hr className="w-full" />
  </div>
);

const SignUpInfo = () => {
  return (
    <>
      <p className="text-xs font-medium text-muted-foreground">
        As contas criadas aqui são para fins de interação com o autor deste
        website, especialmente por meio de comentários nas publicações, e podem
        ser excluídas facilmente a qualquer momento.
      </p>

      <p className="text-xs font-medium text-muted-foreground">
        Não armazenamos no banco mais que o necessário, como nome e e-mail, e
        não enviamos e-mails insuportáveis de newsletters ou promocionais .
      </p>

      <p className="text-xs font-medium text-muted-foreground">
        Para mais informações como feedbacks ou report de bugs, por favor entrar
        em contato por meio do{" "}
        <Link
          href="/contact"
          className="text-xs underline underline-offset-2 text-primary"
        >
          link
        </Link>
        .
      </p>

      <hr className="w-full" />

      <p className="text-xs font-medium text-muted-foreground">
        O código deste site está disponível no{" "}
        <Link
          href={externalUrls.blogGitHub}
          variant="external"
          className="text-xs underline underline-offset-2 text-primary"
        >
          GitHub
        </Link>
        .
      </p>
    </>
  );
};

export { Separation, SignUpInfo };
