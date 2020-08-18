export class Enzyme {
    id: number;
    name: string;
    sequence: string;
    concentration: number;
    unit: string;
    boundary: boolean;
    constant: boolean;

    constructor(enzyme?: Enzyme) {
        this.id = enzyme && enzyme.id || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
        this.boundary = enzyme && enzyme.boundary || undefined;
        this.constant = enzyme && enzyme.constant || undefined;
    }
}

export class Reagent {
    id: number;
    name: string;
    concentration: number;
    unit: string;
    boundary: boolean;
    constant: boolean;

    constructor(reagent?: Reagent) {
        this.id = reagent && reagent.id || undefined;
        this.name = reagent && reagent.name || undefined;
        this.concentration = reagent && reagent.concentration || undefined;
        this.unit = reagent && reagent.unit || undefined;
        this.boundary = reagent && reagent.boundary || undefined;
        this.constant = reagent && reagent.constant || undefined;
    }
}

export class Vessel {
    id: number;
    name: string;
    metaId: string;
    constant: boolean;
    size: number;
    unit: string;

    constructor(vessel?: Vessel) {
        this.id = vessel && vessel.id || undefined;
        this.name = vessel && vessel.name || undefined;
        this.metaId = vessel && vessel.metaId || undefined;
        this.constant = vessel && vessel.constant || undefined;
        this.size = vessel && vessel.size || undefined;
        this.unit = vessel && vessel.unit || undefined;
    }
}

export class Replicate {
    id: number;
    replica: string;
    reagent: number;
    type: string;
    data_unit: number;
    time_unit: number;

    constructor(replicate?: Replicate) {
        this.id = replicate && replicate.id || undefined;
        this.replica = replicate && replicate.replica || undefined;
        this.reagent = replicate && replicate.reagent || undefined;
        this.type = replicate && replicate.type || undefined;
        this.data_unit = replicate && replicate.data_unit || undefined;
        this.time_unit = replicate && replicate.time_unit || undefined;
    }
}
