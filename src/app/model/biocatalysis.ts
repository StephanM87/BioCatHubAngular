export interface Enzyme {
    id: number;
    enzymeName: string;
    aminoAcidSequence: string;
    concentration: string;
    hostOrganism: string;
    productionOrganism: string;
    unit: string;
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
    replica: string;
    reagent: number;
    type: string;
    data_unit: number;
    time_unit: number;
}
