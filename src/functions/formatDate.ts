const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0"); // dd
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mm
  const year = date.getFullYear(); // yyyy
  const hours = String(date.getHours()).padStart(2, "0"); // h
  const minutes = String(date.getMinutes()).padStart(2, "0"); // m
  return `${day}/${month}/${year} às ${hours}:${minutes}`;
};

function calculateDaysDiff(date: Date): string {
  const today = new Date(); // Current date
  const msDiff = today.getTime() - date.getTime(); // Miliseconds
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24)); // Convert to days
  switch (days) {
    case 0:
      return "hoje";
    case 1:
      return "à 1 dia";
    default:
      return `à ${days} dias`;
  }
}

export { formatDate, calculateDaysDiff };
