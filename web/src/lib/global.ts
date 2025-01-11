const getGlobal = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/global", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    console.error(`${res.status} ${res.statusText}`);
    throw new Error("Failed to fetch Global");
  }
  const data = await res.json();
  return data;
};

export { getGlobal };