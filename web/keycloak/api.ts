import { auth } from "./auth";

// src/services/api.ts
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const session = await auth();
  const baseUrl = process.env.API_URL_SERVER || "http://localhost:8080/api";
  const headers = new Headers(options.headers);

  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Session expired or not authorized");
    }
    throw new Error("Fetching error");
  }

  return response.json();
}

// Example usage:
/*
    export default async function ArticlePage() {
    const posts = await fetchWithAuth("/posts/2022/5/21/example-slug"); 

    return (
        <main>
        <h1>TITLE</h1>
        <ul>
            {posts.map((post: any) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
        </main>
    );
    }
*/
