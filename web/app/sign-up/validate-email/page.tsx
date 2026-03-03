import { Suspense } from "react";
import ValidateEmailFormServer from "../../../components/ValidateEmailForm/server";

export default async function ValidateEmailPage() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center mx-auto px-4 py-8 sm:px-8">
      <Suspense>
        <ValidateEmailFormServer />
      </Suspense>
    </main>
  );
}
