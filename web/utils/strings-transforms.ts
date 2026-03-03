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
