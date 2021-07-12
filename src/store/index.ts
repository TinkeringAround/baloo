import create, {State} from "zustand";

export interface BalooStore extends State {
    readonly capacity: number;
    readonly chargingCurrent: number;
    readonly loadCurrent: number;
    readonly voltage: number;
    readonly temperature: number;
    readonly humidity: number;
}

export const INITIAL_STATE = {
    capacity: 0,
    chargingCurrent: 0,
    loadCurrent: 0,
    voltage: 0,
    temperature: 0,
    humidity: 0
}

export const useBaloo = create<BalooStore>(() => INITIAL_STATE);
