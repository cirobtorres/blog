import { slugify } from "./strings-transforms";

export const convertToLargeDate = (ISOdate: Date) => {
  const date = new Date(ISOdate);

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} de ${month} de ${year}, às ${hours}:${minutes}`;
};

export const convertToSmallDate = (ISOdate: Date) => {
  const date = new Date(ISOdate);

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
};

export const mountURL = ({ createdAt, title }: Article) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const slug = slugify(title);

  return `/articles/${year}/${month}/${day}/${slug}`;
};
