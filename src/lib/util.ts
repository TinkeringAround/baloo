export type Dict<T> = { [key: string]: T };

export const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  Math.round((value - x1) * (y2 - x2) / (y1 - x1) + x2);

export const toValue = (value: number, unit: string, fractions = 0) =>
  `${value.toFixed(fractions)}${unit}`;