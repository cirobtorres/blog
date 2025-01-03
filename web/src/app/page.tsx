"use server";

import Link from "next/link";
import BodyComponent from "../components/Body";
import { createClient } from "../utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: publications } = await supabase
    .from("publication")
    .select("*")
    .neq("private", true)
    .order("created_at", { ascending: false })
    .returns<Publication[]>();

  return (
    <BodyComponent>
      <main>
        <div className="w-full blog-center-content">
          {publications && (
            <ul>
              {publications.map((publication) => (
                <li key={publication.id}>
                  <Link
                    href={`publicacoes/${publication.id}/${publication.slug}`}
                  >
                    {publication.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </BodyComponent>
  );
}
