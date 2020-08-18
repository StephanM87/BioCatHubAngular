export interface Enzyme {
    id: number;
    name: string;
    sequence: string;
    concentration: number;
    unit: string;
    boundary: boolean;
    constant: boolean;
}

export interface Reagent {
    id: number;
    name: string;
    concentration: number;
    unit: string;
    boundary: boolean;
    constant: boolean;
}

export class Vessel {
    id: number;
    name: string;
    metaId: string;
    constant: boolean;
    size: number;
    unit: string;

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.metaId = undefined;
        this.constant = undefined;
        this.size = undefined;
        this.unit = undefined;
    }
}

export interface Replicate {
    id: number;
    replica: string;
    reagent: number;
    type: string;
    data_unit: number;
    time_unit: number;
}
