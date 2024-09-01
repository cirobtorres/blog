const slugify = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Normaliza a string para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas (acentos)
    .trim() // Remove espaços extras no início e no final
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/[\s_-]+/g, "-") // Substitui espaços e underscores por hifens
    .replace(/^-+|-+$/g, "");
};

export default slugify;
