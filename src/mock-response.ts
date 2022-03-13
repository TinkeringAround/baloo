import { BalooDataEntry } from './store';
import { map } from './util';

export const MOCK_RESPONSE = (): BalooDataEntry[] => {
  const entryCount = 2880;
  return Array.from({ length: entryCount }, (_, index) => {
    const temperature = index % 60 === 0 ?
      { temperature: map(index, 0, entryCount, 200, 250) } :
      null;
    const humidity = index % 60 === 0 ?
      { humidity: map(index, 0, entryCount, 600, 800) } :
      null;

    return {
      ...temperature,
      ...humidity,
      voltage: map(entryCount - index, 0, entryCount, 1245, 1280),
      chargingCurrent: map(index, 0, entryCount, 0, 1000),
      loadCurrent: map(entryCount - index, 0, entryCount, 0, 700)
    };
  });
};