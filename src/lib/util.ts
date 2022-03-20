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

export const getIntervalFor = (length: number, interval: 'short' | 'long' = 'short') => {
  let minutesFraction;
  let hoursFraction;
  let minutes;
  let hours;

  if (length < 1) {
    return '';
  }

  length -= 1;
  if (interval === 'short') {
    minutesFraction = length % 4;
    hoursFraction = length % (4 * 60);

    minutes = Math.round((length - minutesFraction) / 4);
    hours = Math.round((length - hoursFraction) / (4 * 60));
  } else {
    hoursFraction = length % 4;

    minutes = length * 15;
    hours = Math.round((length - hoursFraction) / 4);
  }

  let prefix = 'Messung der letzten ';
  if (hours > 0) {
    const isOne = hours === 1;
    prefix += `${isOne ? '' : hours} Stunde${isOne ? '' : 'n'}`;
    minutes -= hours * 60;

    if (minutes > 0) {
      const isOne = minutes === 1;
      return `${prefix} und ${isOne ? 'einer' : minutes} Minute${isOne ? '' : 'n'}`;
    } else
      return prefix;
  }

  if (minutes > 0) {
    const isOne = minutes === 1;
    return `${prefix}${isOne ? '' : minutes} Minute${isOne ? '' : 'n'}`;
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