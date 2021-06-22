import create, {State} from "zustand";

export interface BalooStore extends State {
    readonly chargingCurrent: number;
    readonly loadCurrent: number;
    readonly voltage: number;
    readonly temperature: number;
    readonly humidity: number;
}

export const INITIAL_STATE = {
    chargingCurrent: 0,
    loadCurrent: 0,
    voltage: 0,
    temperature: 0,
    humidity: 0
}

export const useBaloo = create<BalooStore>(() => INITIAL_STATE);
