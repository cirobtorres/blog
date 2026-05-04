import he from "he";

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Normalize the string to decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Removes diacritical marks (accents)
    .trim() // Remove extra spaces at the beginning and end
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replaces spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Removes - at the beginning and end
};

export const escapeCharacters = (str: string) => he.decode(str);

export const cleanPreCodeBlocks = (htmlDecoded: string) => {
  return (
    htmlDecoded
      // Normaliza CRLF (Windows) e CR (Mac antigo) para LF
      .replace(/\r\n?/g, "\n")
      // Remove caracteres invisíveis
      .replace(/[\u00A0\u200B\uFEFF]/g, " ")
      // Remove tags <pre><code> iniciais
      .replace(/(<pre[^>]*>\n*<code[^>]*>\n*)+/g, "")
      // Remove tags </code></pre> finais
      .replace(/(\n*<\/code>\n*<\/pre>\n*)+/g, "")
  );
};
