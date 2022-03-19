export interface Point {
  x: number;
  y: number;
}

export interface Line {
  id: string;
  data: Point[];
}

export interface GridStep extends Point {
  text: string;
}

export const linear = (before: number, after: number, atPoint: number): number =>
  before + (after - before) * atPoint;

export const interpolate = (data: number[], fitCount: number): number[] => {
  const newData = [];
  const springFactor = Number((data.length - 1) / (fitCount - 1));

  newData[0] = data[0]; // for new allocation
  for (let i = 1; i < fitCount - 1; i++) {
    const tmp = i * springFactor;
    const before = Math.round(Number(Math.floor(tmp)));
    const after = Math.round(Number(Math.ceil(tmp)));
    const atPoint = tmp - before;

    // linear interpolation
    newData[i] = linear(data[before], data[after], atPoint);
  }

  newData[fitCount - 1] = data[data.length - 1]; // for new allocation
  return newData;
};

export const toLine = (values: number[], id: string, samples = 100000): Line => ({
  id,
  data: interpolate(values, samples).map((y, x) => ({ x, y }))
});