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

export interface Vessel {
    id: string;
    name: string;
    metaId: string;
    constant: boolean;
    size: number;
    unit: string;
}

export interface Replicate {
    id: number;
    replica: string;
    reagent: number;
    type: string;
    data_unit: number;
    time_unit: number;
}
