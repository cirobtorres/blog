import { externalUrls } from "../routing/routes";
import { cn } from "../utils/variants";
import { Link } from "./Links";

const Separation = () => (
  <div className="w-full flex items-center">
    <Hr />
    <span className="text-sm  text-neutral-600 dark:text-neutral-500 pointer-events-none mx-2">
      ou
    </span>
    <Hr />
  </div>
);

const Hr = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "w-full h-px bg-linear-to-r dark:from-transparent via-stone-400 dark:via-stone-700 dark:to-transparent",
      className,
    )}
  />
);

const SignUpInfo = () => {
  return (
    <>
      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
        As contas criadas aqui são para fins de interação com o autor deste
        website, especialmente por meio de comentários nas publicações, e podem
        ser excluídas facilmente a qualquer momento.
      </p>

      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
        Não armazenamos no banco mais que o necessário, como nome e e-mail, e
        não enviamos e-mails insuportáveis de newsletters ou promocionais .
      </p>

      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
        Para mais informações como feedbacks ou report de bugs, por favor entrar
        em contato por meio do{" "}
        <Link
          href="/contact"
          className="text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
        >
          link
        </Link>
        .
      </p>

      <Hr />

      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
        O código deste site está disponível no{" "}
        <Link
          href={externalUrls.blogGitHub}
          variant="external"
          className="text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
        >
          GitHub
        </Link>
        .
      </p>
    </>
  );
};

export { Hr, Separation, SignUpInfo };
