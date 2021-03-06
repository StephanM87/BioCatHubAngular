export class Attribute {
    key: string;
    value: string;

    constructor(attribute?: Attribute) {
        this.key = attribute && attribute.key || undefined;
        this.value = attribute && attribute.value || undefined;
    }
}


export class Enzyme {
    ecNumber: string;
    name: string;
    type: string;
    variant: string;
    organism: string;
    sequence: string;
    concentration: number;
    unit: string;
    formulation: string;
    method: string;
    others: Array<Attribute>;
    reaction: Reaction;

    constructor(enzyme?: Enzyme) {
        this.ecNumber = enzyme && enzyme.ecNumber || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.type = enzyme && enzyme.type || undefined;
        this.variant = enzyme && enzyme.variant || undefined;
        this.organism = enzyme && enzyme.organism || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
        this.formulation = enzyme && enzyme.formulation || undefined;
        this.method = enzyme && enzyme.method || undefined;
        this.others = enzyme && enzyme.others || new Array<Attribute>();
        this.reaction = enzyme && enzyme.reaction || new Reaction();
    }
}

export class Reaction {
    value: string;
    educts: Array<Reactant>;
    products: Array<Reactant>;

    constructor(reaction?: Reaction) {
        this.value = reaction && reaction.value || undefined;
        this.educts = reaction && reaction.educts || new Array<Reactant>();
        this.products = reaction && reaction.products || new Array<Reactant>();
    }
}

export class Reactant {
    id: string;
    name: string;
    role: string;
    concentration: number;
    unit: string;
    purity: string;
    supplier: string;
    formula: string;
    smiles: string;
    imageUrl: string;
    others: Array<Attribute>;

    constructor(reactant?: Reactant) {
        this.id = reactant && reactant.id || undefined;
        this.name = reactant && reactant.name || undefined;
        this.role = reactant && reactant.role || undefined;
        this.concentration = reactant && reactant.concentration || undefined;
        this.unit = reactant && reactant.unit || undefined;
        this.purity = reactant && reactant.purity || undefined;
        this.supplier = reactant && reactant.supplier || undefined;
        this.formula = reactant && reactant.formula || undefined;
        this.smiles = reactant && reactant.smiles || undefined;
        this.imageUrl = reactant && reactant.imageUrl || undefined;
        this.others = reactant && reactant.others || new Array<Attribute>();
    }
}

export class Vessel {
    type: string;
    volume: number;
    unit: string;
    others: Array<Attribute>;

    constructor(vessel?: Vessel) {
        this.type = vessel && vessel.type || undefined;
        this.volume = vessel && vessel.volume || undefined;
        this.unit = vessel && vessel.unit || undefined;
        this.others = vessel && vessel.others || new Array<Attribute>();
    }
}

export class Buffer {
    type: string;
    concentration: number;
    unit: string;

    constructor(buffer?: Buffer) {
        this.type = buffer && buffer.type || undefined;
        this.concentration = buffer && buffer.concentration || undefined;
        this.unit = buffer && buffer.unit || undefined;
    }
}

export class Condition {
    temp: number;
    unit: string;
    ph: number;
    buffer: Buffer;
    others: Array<Attribute>;

    constructor(condition?: Condition) {
        this.temp = condition && condition.temp || undefined;
        this.unit = condition && condition.unit || undefined;
        this.ph = condition && condition.ph || undefined;
        this.buffer = condition && condition.buffer || new Buffer();
        this.others = condition && condition.others || new Array<Attribute>();
    }
}

export class ExperimentalData {
    measurements: Array<Measurement>;

    constructor(experimentalData?: ExperimentalData) {
        this.measurements = experimentalData && experimentalData.measurements || new Array<Measurement>();
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
    plotStyle: string;

    constructor(measurement?: Measurement) {
        this.reagent = measurement && measurement.reagent || undefined;
        this.x_unit = measurement && measurement.x_unit || undefined;
        this.x_name = measurement && measurement.x_name || undefined;
        this.y_unit = measurement && measurement.y_unit || undefined;
        this.y_name = measurement && measurement.y_name || undefined;
        this.replicates = measurement && measurement.replicates || new Array<Replicate>();
        this.notes = measurement && measurement.notes || undefined;
        this.plotStyle = measurement && measurement.plotStyle || 'point';
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
