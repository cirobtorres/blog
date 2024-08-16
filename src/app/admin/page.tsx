"use server";

import AdminSignInForm from "@/components/AdminSignInForm";

export default async function AdminPage() {
  return (
    <main className="h-svh flex flex-col justify-center items-center">
      <AdminSignInForm />
    </main>
  );
}
