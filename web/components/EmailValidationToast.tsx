"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export function EmailValidationToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isVerified = searchParams.get("verified");
    const errorMsg = searchParams.get("error");

    if (isVerified === "true") {
      toast.success("E-mail validado!");

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("verified");
      const newUrl = newParams.toString()
        ? `${pathname}?${newParams.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    }

    if (errorMsg) {
      const messages: Record<string, string> = {
        invalid_link: "Link de verificação inválido.",
        expired_token: "O link de verificação expirou ou já foi utilizado.",
      };

      toast.error("Falha na verificação de e-mail", {
        description:
          messages[errorMsg] || "Ocorreu um erro ao validar seu e-mail.",
      });

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("error");
      const newUrl = newParams.toString()
        ? `${pathname}?${newParams.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
