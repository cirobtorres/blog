"use server";

import { Suspense } from "react";
import ValidateEmailFormServer from "../../../../components/ValidateEmailForm/server";

export default async function ValidateEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { step } = await searchParams;
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center mx-auto px-4 py-8 sm:px-8 bg-stone-150 dark:bg-stone-950">
      <Suspense>
        <ValidateEmailFormServer step={step} />
      </Suspense>
    </main>
  );
}
