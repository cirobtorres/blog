"use client";

import React from "react";
import { Link } from "../../../../../../components/Links";
import { Button } from "../../../../../../components/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ArticlePageIdError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-50 dark:bg-stone-950">
      <div className="max-w-md p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Ops! Algo deu errado ao abrir o artigo.
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Não foi possível processar esta página no momento.
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => reset()}
            className="flex-1 h-9 px-0"
          >
            Tentar novamente
          </Button>
          <Link href="/" variant="button" className="flex-1 h-9 px-0">
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
