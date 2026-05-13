export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response("Missing URL", { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, {
        status: res.status,
      });
    }

    // For images larger than 10MB (very unlikely it gets this far)
    const contentLength = res.headers.get("content-length");
    if (contentLength && Number(contentLength) > 10 * 1024 * 1024) {
      return new Response("Arquivo muito grande", { status: 413 });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type":
          res.headers.get("content-type") || "application/octet-stream",
      },
    });
  } catch (e) {
    console.error("fetch-file error:", e);
    return new Response("Internal error", { status: 500 });
  }
}
