import { BalooDataEntry, BalooState } from './index';

// Libs
import { map } from '../lib/util';

export const toBalooState = (entry: BalooDataEntry, state: BalooState): BalooState => ({
  temperature: entry.temperature,
  humidity: entry.humidity,
  chargingCurrent: entry.chargingCurrent / 1000,
  loadCurrent: entry.loadCurrent / 1000,
  voltage: entry.voltage / 100,
  capacity: estimateCapacity(entry.voltage),
  power: calculatePower(entry.chargingCurrent, entry.loadCurrent, entry.voltage),
  logs: state.logs
});

const estimateCapacity = (normalizedVoltage: number) => {
  if (normalizedVoltage > 1280)
    return 100;
  else if (normalizedVoltage > 1255)
    return map(normalizedVoltage, 1255, 1280, 75, 100);
  else if (normalizedVoltage > 1230)
    return map(normalizedVoltage, 1230, 1255, 50, 75);
  else if (normalizedVoltage > 1220)
    return map(normalizedVoltage, 1220, 1230, 25, 50);
  else if (normalizedVoltage > 1200)
    return map(normalizedVoltage, 1200, 1220, 0, 25);

  return 0;
};

const calculatePower = (normalizedChargingCurrent: number, normalizedLoadCurrent: number, normalizedVoltage: number) => {
  return (normalizedLoadCurrent - normalizedChargingCurrent) * normalizedVoltage / 100000;
};