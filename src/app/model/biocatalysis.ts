export class Enzyme {
    ecNumber: string;
    name: string;
    sequence: string;
    unit: string;
    concentration: number;
    formulation: string;
    determination: string;
    reaction: Reaction;
    brendaLink: string;

    constructor(enzyme?: Enzyme) {
        this.ecNumber = enzyme && enzyme.ecNumber || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.formulation = enzyme && enzyme.formulation || undefined;
        this.determination = enzyme && enzyme.determination || undefined;
        this.reaction = enzyme && enzyme.reaction || new Reaction();
        this.brendaLink = enzyme && enzyme.brendaLink || undefined;
    }
}

export class Reaction {
    educts: Array<Reactant>;
    products: Array<Reactant>;

    constructor(reaction?: Reaction) {
        this.educts = reaction && reaction.educts || new Array<Reactant>();
        this.products = reaction && reaction.products || new Array<Reactant>();
    }
}

export class Reactant {
    id: string;
    name: string;
    role: string;
    unit: string;
    concentration: number;
    formula: string;
    smiles: string;
    imageUrl: string;
    brendaLink: string;

    constructor(reactant?: Reactant) {
        this.id = reactant && reactant.id || undefined;
        this.name = reactant && reactant.name || undefined;
        this.role = reactant && reactant.role || undefined;
        this.unit = reactant && reactant.unit || undefined;
        this.concentration = reactant && reactant.concentration || undefined;
        this.formula = reactant && reactant.formula || undefined;
        this.smiles = reactant && reactant.smiles || undefined;
        this.imageUrl = reactant && reactant.imageUrl || undefined;
        this.brendaLink = reactant && reactant.brendaLink || undefined;
    }
}

export class Vessel {
    type: string;
    volume: number;
    unit: string;

    constructor(vessel?: Vessel) {
        this.type = vessel && vessel.type || undefined;
        this.volume = vessel && vessel.volume || undefined;
        this.unit = vessel && vessel.unit || undefined;
    }
}

export class Condition {
    name: string;
    temp: number;
    unit: string;
    ph: number;

    constructor(condition?: Condition) {
        this.name = condition && condition.name || undefined;
        this.temp = condition && condition.temp || undefined;
        this.unit = condition && condition.unit || undefined;
        this.ph = condition && condition.ph || undefined;
    }
}

export class Plot {
    style: string;
    size: number;
    replicate1: boolean;
    replicate2: boolean;
    replicate3: boolean;

    constructor(plot?: Plot) {
        this.style = plot && plot.style || 'point';
        this.size = plot && plot.size || 50;
        this.replicate1 = plot && plot.replicate1 || true;
        this.replicate2 = plot && plot.replicate2 || true;
        this.replicate3 = plot && plot.replicate3 || true;
    }
}

export class Measurement {
    reagent: string;
    x_unit: string;
    x_name: string;
    y_unit: string;
    y_name: string;
    replicates: Array<Replicate>;
    notes: string;
    plot: Plot;

    constructor(measurement?: Measurement) {
        this.reagent = measurement && measurement.reagent || undefined;
        this.x_unit = measurement && measurement.x_unit || undefined;
        this.x_name = measurement && measurement.x_name || undefined;
        this.y_unit = measurement && measurement.y_unit || undefined;
        this.y_name = measurement && measurement.y_name || undefined;
        this.replicates = measurement && measurement.replicates || new Array<Replicate>();
        this.notes = measurement && measurement.notes || undefined;
        this.plot = measurement && measurement.plot || new Plot();
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

export class User {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;

    constructor(user?: User) {
        this.firstName = user && user.firstName || undefined;
        this.lastName = user && user.lastName || undefined;
        this.email = user && user.email || undefined;
        this.institution = user && user.institution || undefined;
    }
}
