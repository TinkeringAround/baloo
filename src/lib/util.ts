export type Dict<T> = { [key: string]: T };

export enum Fields {
  current = 'current',
  voltage = 'voltage',
  capacity = 'capacity',
  power = 'power',
  humidity = 'humidity',
  temperature = 'temperature',
}

export const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  Math.round((value - x1) * (y2 - x2) / (y1 - x1) + x2);

export const lastElement = (array: Array<number>) => array[array.length - 1] ?? 0;

export const toValue = (value: number, unit: string, fractions = 0) =>
  `${value.toFixed(fractions)}${unit}`;

export const getIntervalFor = (length: number, timeRef: number) => {
  const time = new Date(length * timeRef);
  const hours = time.getHours();
  const minutes = time.getMinutes();

  let prefix = 'Messung der letzten ';
  if (hours > 0) {
    prefix += `${hours - 1} Stunden`;

    if (minutes > 0) {
      return `${prefix} und ${minutes} Minuten`;
    } else
      return prefix;
  }

  if (minutes > 0) {
    return `${prefix}${minutes} Minuten`;
  }

  return '';
};

export const hexToRGB = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};