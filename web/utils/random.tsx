export const RandomInt = (min: number = 0, max: number = 10) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
