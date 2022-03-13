import create, {State} from "zustand";

export interface BalooDataEntry {
    readonly chargingCurrent: number;
    readonly loadCurrent: number;
    readonly voltage: number;
    readonly temperature?: number;
    readonly humidity?: number;
}

export interface BalooStore extends State {
    readonly capacities: number[];
    readonly chargingCurrents: number[];
    readonly loadCurrents: number[];
    readonly voltages: number[];
    readonly temperatures: number[];
    readonly humidities: number[];
    readonly powers: number[];
}

export const INITIAL_STATE = {
    capacities: [],
    chargingCurrents: [],
    loadCurrents: [],
    voltages: [],
    temperatures: [],
    humidities: [],
    powers: []
}

export const useBaloo = create<BalooStore>(() => INITIAL_STATE);
