"use server";

import { createClient } from "@/utils/supabase/server";
import Body from "../components/Body";

export default async function HomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <Body>
      <div className="text-white">
        <h1>Test User</h1>
        <p>{data.user?.email}</p>
      </div>
    </Body>
  );
}
