"use server";

import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <main className="h-svh flex flex-col justify-center items-center">
      <h1>Test User</h1>
      <p>{data.user?.email}</p>
    </main>
  );
}
