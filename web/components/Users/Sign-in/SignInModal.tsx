"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SignInForm from "./SignInForm";
import { useAuth } from "../../../providers/AuthProvider";
import { publicWebUrls } from "../../../routing/routes";
import { Separation } from "../../utils";
import { Link, LoginProviders } from "../../Links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../Dialog";

function resolveReturnUrl(redirectUrl: string | null): string | null {
  if (!redirectUrl?.startsWith("/")) return null;
  return decodeURIComponent(redirectUrl);
}

export default function SignInModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const redirectUrl = searchParams.get("redirect_url");

  if (pathname !== publicWebUrls.signIn || user?.ok) {
    return null;
  }

  const dismissModal = () => {
    const returnUrl = resolveReturnUrl(redirectUrl);
    if (returnUrl) {
      router.replace(returnUrl, { scroll: false });
      return;
    }
    router.back();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dismissModal();
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Faça LOGIN</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Modal de autenticação
        </DialogDescription>
        <div className="flex flex-col gap-2 p-4">
          <SignInForm mode="modal" redirectUrl={redirectUrl ?? ""} />
          <Link
            href={publicWebUrls.forget}
            className="mx-auto text-xs text-primary/75 hover:text-primary dark:hover:text-primary underline underline-offset-2"
          >
            Esqueci minha senha
          </Link>
          <Separation />
          <LoginProviders />
        </div>
      </DialogContent>
    </Dialog>
  );
}
