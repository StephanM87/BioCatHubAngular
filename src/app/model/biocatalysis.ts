export class Enzyme {
    id: number;
    name: string;
    sequence: string;
    concentration: number;
    unit: string;

    constructor(enzyme?: Enzyme) {
        this.id = enzyme && enzyme.id || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
    }
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
    id: number;
    replica: string;
    reagent: string;
    type: string;
    data_unit: string;
    time_unit: string;
    values: Replicate[];

    constructor(measurement?: Measurement) {
        this.id = measurement && measurement.id || undefined;
        this.replica = measurement && measurement.replica || undefined;
        this.reagent = measurement && measurement.reagent || undefined;
        this.type = measurement && measurement.type || undefined;
        this.data_unit = measurement && measurement.data_unit || undefined;
        this.time_unit = measurement && measurement.time_unit || undefined;
        this.values = measurement && measurement.values || undefined;
    }
}

export class Replicate {
    x_value: number;
    replicates: number[];

    constructor(x_value: number, replicates: number[]){
        this.x_value = x_value;
        this.replicates = replicates;
    }
}
