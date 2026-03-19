import { Suspense } from "react";
import { Link } from "../../../components/Links";
import { Skeleton } from "../../../components/Skeleton";
import LoginProviders from "../../../components/LoginProviders";
import { publicWebUrls } from "../../../config/routes";
import { Hr, Separation, SignUpInfo } from "../../../components/utils";
import { Alert } from "../../../components/Alert";
import SignUpForm from "../../../components/Forms/SignUpForm";

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
    <main className="h-full min-h-screen grid min-[700px]:grid-cols-[1fr_700px]">
      <div className="grayscale [background:linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,0.25),rgba(0,0,0,1)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]" />
      <div className="w-full h-full min-h-screen px-4 min-[700px]:px-8 py-8 not-dark:shadow min-[700px]:border-l">
        <div className="max-w-125 mx-auto h-full flex flex-col justify-center gap-2">
          <Link href="/" className="ml-0 mr-auto mb-4">
            Home
          </Link>

          <h1 className="text-3xl font-bold mb-8">Cadastrar</h1>

          <Alert title="Site em construção" variant="warn">
            Contas cadastradas aqui serão apagadas no futuro.
          </Alert>

          <Suspense fallback={SignUpFormLoad()}>
            <SignUpForm />
          </Suspense>

          <Separation />

          <LoginProviders />

          <p className="text-xs font-medium text-neutral-600 dark:text-neutral-500">
            Se você já possui uma conta, clique{" "}
            <Link
              href={publicWebUrls.signIn}
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
    </main>
  );
}
