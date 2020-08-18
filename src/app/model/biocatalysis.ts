export interface Enzyme {
    id: number;
    name: string;
    sequence: string;
    concentration: string;
    unit: string;
    boundary: boolean;
    constant: boolean;
}

export interface Reagent {
    id: number;
    reagentName: string;
    concentration: string;
    unit: string;
    kind: string;
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
