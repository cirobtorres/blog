function collectH3Contents(html: string) {
  // Pattern to capture any <h3> tag
  const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;

  const matches = html.match(h3Regex);
  if (!matches) return [];

  // Removes <h3> and </h3> tags (keeps only its content)
  return matches.map((match) => {
    return match.replace(/<\/?h3[^>]*>/gi, "").trim();
  });
}

export default collectH3Contents;
