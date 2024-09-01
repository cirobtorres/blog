const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  // Extrair partes da data
  const day = String(date.getDate()).padStart(2, "0"); // dd
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mm
  const year = date.getFullYear(); // yyyy

  // Extrair partes do horário
  const hours = String(date.getHours()).padStart(2, "0"); // h
  const minutes = String(date.getMinutes()).padStart(2, "0"); // m

  // Retornar a data no formato desejado
  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

export default formatDate;
