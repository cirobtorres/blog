import { Suspense } from "react";
import UserAuthorizationTest from "../../components/UserAuthorizationTest";

export default async function TestPrivatePage() {
  return (
    <main className="w-full min-h-screen max-w-200 mx-auto px-4 sm:px-8 py-8 shadow bg-blue-950">
      PRIVATE!
      <Suspense>
        <UserAuthorizationTest permission="AUTHOR" />
      </Suspense>
    </main>
  );
}
