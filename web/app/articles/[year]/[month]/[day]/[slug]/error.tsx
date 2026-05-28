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
    // TODO: log erros somewhere else (Sentry, LogRocket etc)
    console.error("Capturado pelo Error Boundary do Artigo:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-50 dark:bg-stone-950">
      <div className="max-w-md p-6 bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Ops! Algo deu errado ao abrir o artigo.
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          Não foi possível processar esta página no momento.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-950 dark:bg-neutral-50 dark:text-neutral-950 rounded-lg hover:opacity-90 transition-opacity"
          >
            Tentar novamente
          </Button>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 border border-stone-300 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
