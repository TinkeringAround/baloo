import { BalooData, BalooDataEntry, BalooSnapshot, BalooState } from './index';

// Libs
import { lastElement, map } from '../lib/util';

export const toBalooStateWithSnapshot = (entries: BalooDataEntry[]): BalooState => {
  const temperatures: number[] = [];
  const humidities: number[] = [];
  const voltages: number[] = [];
  const chargingCurrents: number[] = [];
  const loadCurrents: number[] = [];
  const capacities: number[] = [];
  const powers: number[] = [];

  entries.forEach(entry => {
    if (entry.temperature) {
      temperatures.push(entry.temperature / 10);
    }

    if (entry.humidity) {
      humidities.push(entry.humidity / 10);
    }

    voltages.push(entry.voltage / 100);
    chargingCurrents.push(entry.chargingCurrent / 100);
    loadCurrents.push(entry.loadCurrent / 100);
    capacities.push(estimateCapacity(entry.voltage));
    powers.push(calculatePower(entry.chargingCurrent, entry.loadCurrent, entry.voltage));
  });

  const data: BalooData = {
    temperatures,
    humidities,
    voltages,
    chargingCurrents,
    loadCurrents,
    capacities,
    powers
  };

  const snapshot: BalooSnapshot = {
    temperature: lastElement(temperatures),
    humidity: lastElement(humidities),
    chargingCurrent: lastElement(chargingCurrents),
    loadCurrent: lastElement(loadCurrents),
    voltage: lastElement(voltages),
    capacity: lastElement(capacities),
    power: lastElement(powers)
  };

  return {
    ...data,
    ...snapshot
  };
};

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
  return (normalizedChargingCurrent - normalizedLoadCurrent) * normalizedVoltage / 10000;
};