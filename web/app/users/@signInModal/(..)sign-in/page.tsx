"use client";

import { useRouter } from "next/navigation";
import { publicWebUrls } from "../../../../routing/routes";
import { Separation } from "../../../../components/utils";
import { Link, LoginProviders } from "../../../../components/Links";
import SignInForm from "../../../../components/Users/Sign-in/SignInForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/Dialog";

export default function AuthModalPage() {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
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
          <SignInForm />
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
