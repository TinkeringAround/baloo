import { BalooStore } from './index';
import { lastElement } from '../util';

export const selectTemperature = (state: BalooStore) => lastElement(state.temperatures);
export const selectHumidity = (state: BalooStore) => lastElement(state.humidities);
export const selectChargingCurrent = (state: BalooStore) => lastElement(state.chargingCurrents);
export const selectLoadCurrent = (state: BalooStore) => lastElement(state.loadCurrents);
export const selectVoltage = (state: BalooStore) => lastElement(state.voltages);
export const selectCapacity = (state: BalooStore) => lastElement(state.capacities);
export const selectPower = (state: BalooStore) => lastElement(state.powers);

export const selectCurrentState = (state: BalooStore) => ({
  temperature: selectTemperature(state),
  humidity: selectHumidity(state),
  chargingCurrent: selectChargingCurrent(state),
  loadCurrent: selectLoadCurrent(state),
  voltage: selectVoltage(state),
  capacity: selectCapacity(state),
  power: selectPower(state)
});