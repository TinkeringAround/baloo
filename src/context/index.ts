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

interface HasLogs {
  logs: string;
}

export interface BalooDataEntry extends HasCurrent, HasVoltage, HasEnvironment {
}

export interface BalooState extends HasCurrent, HasVoltage, HasEnvironment, HasLogs {
  readonly power: number;
  readonly capacity: number;
}

export const INITIAL_STATE: BalooState = {
  chargingCurrent: 0,
  loadCurrent: 0,
  voltage: 0,
  power: 0,
  capacity: 0,
  humidity: 0,
  temperature: 0,
  logs: ''
};

export const BalooStateContext = React.createContext<BalooState>(INITIAL_STATE);