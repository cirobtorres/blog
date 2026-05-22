const problematicWords = [
  "bloqueado",
  "excluido",
  "deletado",
  "apagado",
  "removido",
  "admin",
  "administrator",
  "administrador",
  "suporte",
  "support",
  "sistema",
  "system",
  "moderador",
  "mod",
  "root",
  "null",
  "undefined",
  "anonymous",
  "anonimo",
  "usuario",
  "user",
  "owner",
];

const profanyWords = [
  "nazista",
  "nazismo",
  "antissemita",
  "crioulo",
  "estuprador",
  "assassino",
  "pedofilo",
  "caralho",
  "porra",
  "puta",
  "foder",
  "fuder",
  "arrombado",
  "buceta",
  "boceta",
  "xoxota",
  "chochota",
  "penis",
  "pinto",
  "piroca",
  "bicha",
  "viado",
  "vadia",
  "merda",
  "bosta",
  "cu",
];

const blacklist = [...profanyWords, ...problematicWords];

export function isForbiddenName(name: string): boolean {
  const sanitizedName = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const matchesText = blacklist.some((forbiddenWord) =>
    sanitizedName.includes(forbiddenWord),
  );
  if (matchesText) return true;
  return false;
}
