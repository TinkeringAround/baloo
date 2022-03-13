import { Serie } from '@nivo/line';

export const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  Math.round((value - x1) * (y2 - x2) / (y1 - x1) + x2);

export const lastElement = (array: Array<number>) => array[array.length - 1] ?? 0;

export const sample = (rawData: number[], samples: number): number[] => {
  if (rawData.length < samples) {
    return rawData;
  }

  // the number of samples in each subdivision
  const blockSize = Math.floor(rawData.length / samples);

  const sampledData = [];
  for (let i = 0; i < samples; i++) {
    // the location of the first sample in the block
    let blockStart = blockSize * i;

    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      // find the sum of all the samples in the block
      sum = sum + rawData[blockStart + j]; //Math.abs(rawData[blockStart + j]);
    }

    // divide the sum by the block size to get the average
    sampledData.push(sum / blockSize);
  }

  return sampledData;
};

export const toSerie = (values: number[], id: string, samples = 100000): Serie => ({
  id,
  data: sample(values, samples).map((y, x) => ({ x, y }))
});

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

export enum Fields {
  current = 'current',
  voltage = 'voltage',
  capacity = 'capacity',
  power = 'power',
  humidity = 'humidity',
  temperature = 'temperature',
}