export class Enzyme {
    id: number;
    ecNumber: string;
    name: string;
    sequence: string;
    concentration: number;
    unit: string;
    brendaLink: string;

    constructor(enzyme?: Enzyme) {
        this.id = enzyme && enzyme.id || undefined;
        this.ecNumber = enzyme && enzyme.ecNumber || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
        this.brendaLink = enzyme && enzyme.brendaLink || undefined;
    }
}

export interface EnzymeSearch {
    ecNumber: string;
    enzymeName: string;
    brendaLink: string;
}

export class Reagent {
    id: number;
    name: string;
    concentration: number;
    unit: string;

    constructor(reagent?: Reagent) {
        this.id = reagent && reagent.id || undefined;
        this.name = reagent && reagent.name || undefined;
        this.concentration = reagent && reagent.concentration || undefined;
        this.unit = reagent && reagent.unit || undefined;
    }
}

export class Vessel {
    id: number;
    name: string;
    size: number;
    unit: string;

    constructor(vessel?: Vessel) {
        this.id = vessel && vessel.id || undefined;
        this.name = vessel && vessel.name || undefined;
        this.size = vessel && vessel.size || undefined;
        this.unit = vessel && vessel.unit || undefined;
    }
}

export class Measurement {
    reagent: string;
    x_unit: string;
    x_name: string;
    y_unit: string;
    y_name: string;
    replicates: Array<Replicate>;

    constructor(measurement?: Measurement) {
        this.reagent = measurement && measurement.reagent || undefined;
        this.x_unit = measurement && measurement.x_unit || undefined;
        this.x_name = measurement && measurement.x_name || undefined;
        this.y_unit = measurement && measurement.y_unit || undefined;
        this.y_name = measurement && measurement.y_name || undefined;
        this.replicates = measurement && measurement.replicates || new Array<Replicate>();
    }
}

export class Replicate {
    x_value: number;
    y_values: Array<number>;

    constructor(replicate?: Replicate){
        this.x_value = replicate && replicate.x_value || undefined;
        this.y_values = replicate && replicate.y_values || new Array<number>();
    }
}
