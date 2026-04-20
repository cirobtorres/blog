import NextLink from "next/link";
import { Suspense } from "react";
import { Link, LoginProviders } from "../../../components/Links";
import { Skeleton } from "../../../components/Skeleton";
import { publicWebUrls } from "../../../routing/routes";
import { Hr, Separation, SignUpInfo } from "../../../components/utils";
import { Alert } from "../../../components/Alert";
import SignUpForm from "../../../components/Forms/SignUpForm";

const SignUpFormLoad = () => (
  <div className="w-full flex flex-col justify-center gap-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className="h-9.5 flex items-center" />
    ))}
    <Skeleton className="w-full h-1.5 rounded-full" />
    <div className="grid grid-cols-[14px_1fr] gap-2">
      <Skeleton className="w-full size-4 rounded" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full h-3.5" />
        <Skeleton className="w-1/4 h-3.5" />
      </div>
    </div>
    <Skeleton className="w-full h-9.5" />
  </div>
);

export default function SignUpPage() {
  return (
    <main className="h-full min-h-screen grid min-[700px]:grid-cols-[700px_1fr]">
      <div className="relative w-full h-full min-h-screen not-dark:shadow min-[700px]:border-r">
        <NextLink
          href={publicWebUrls.home}
          aria-label="Retornar para home page"
          className="z-10 absolute top-1/2 -translate-y-1/2 size-14 rounded-full -right-7 border bg-stone-200 dark:bg-stone-900"
        />
        <div className="h-screen p-1">
          <div className="h-full p-8 overflow-y-auto scrollbar">
            <div className="max-w-125 mx-auto flex flex-col justify-center gap-2">
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
        </div>
      </div>
      <RightBanner />
    </main>
  );
}

const RightBanner = ({ children }: { children?: string }) => (
  <div className="grayscale flex justify-center items-center [background:linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,0.25)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')] dark:[background:linear-gradient(90deg,rgba(0,0,0,1),rgba(0,0,0,0.25)),radial-gradient(circle,rgba(0,0,0,0.0),rgba(0,0,0,1)),url('https://imgproxy.flathub.org/insecure/dpr:1/f:webp/rs:fill-down/aHR0cHM6Ly9kbC5mbGF0aHViLm9yZy9tZWRpYS9vcmcvYmxlbmRlci9CbGVuZGVyLzBkNzMxYmE5NzU3NzE5YTQzMDkyMzBhNjhkMmVlY2VkL3NjcmVlbnNob3RzL2ltYWdlLTRfb3JpZy5wbmc')]">
    <div className="max-w-150 px-8">
      <h2 className="text-2xl font-bold">{children}</h2>
    </div>
  </div>
);
