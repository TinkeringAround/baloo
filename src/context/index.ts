import React from 'react';

interface HasCurrent {
  readonly chargingCurrent: number;
  readonly loadCurrent: number;
}

interface HasVoltage {
  readonly voltage: number;
}

interface HasEnvironment {
  readonly temperature: number;
  readonly humidity: number;
}

export interface BalooDataEntry extends HasCurrent, HasVoltage, Partial<HasEnvironment> {
}

export interface BalooData {
  readonly capacities: number[];
  readonly chargingCurrents: number[];
  readonly loadCurrents: number[];
  readonly voltages: number[];
  readonly temperatures: number[];
  readonly humidities: number[];
  readonly powers: number[];
}

export interface BalooSnapshot extends HasCurrent, HasVoltage, HasEnvironment {
  readonly power: number;
  readonly capacity: number;
}

export interface BalooState extends BalooData, BalooSnapshot {
}

export const INITIAL_DATA: BalooData = {
  capacities: [],
  chargingCurrents: [],
  loadCurrents: [],
  voltages: [],
  temperatures: [],
  humidities: [],
  powers: []
};

export const INITIAL_SNAPSHOT: BalooSnapshot = {
  chargingCurrent: 0,
  loadCurrent: 0,
  voltage: 0,
  power: 0,
  capacity: 0,
  humidity: 0,
  temperature: 0
};

export const INITIAL_STATE: BalooState = {
  ...INITIAL_DATA,
  ...INITIAL_SNAPSHOT
};

export const BalooStateContext = React.createContext<BalooState>(INITIAL_STATE);