export class Enzyme {
    ecNumber: string;
    name: string;
    sequence: string;
    concentration: number;
    unit: string;
    formulation: string;
    determination: string;
    reaction: Reaction;
    brendaLink: string;

    constructor(enzyme?: Enzyme) {
        this.ecNumber = enzyme && enzyme.ecNumber || undefined;
        this.name = enzyme && enzyme.name || undefined;
        this.sequence = enzyme && enzyme.sequence || undefined;
        this.concentration = enzyme && enzyme.concentration || undefined;
        this.unit = enzyme && enzyme.unit || undefined;
        this.formulation = enzyme && enzyme.formulation || undefined;
        this.determination = enzyme && enzyme.determination || undefined;
        this.reaction = enzyme && enzyme.reaction || new Reaction();
        this.brendaLink = enzyme && enzyme.brendaLink || undefined;
    }
}

export class Reaction {
    value: string;
    educts: Array<Ligand>;
    products: Array<Ligand>;

    constructor(reaction?: Reaction) {
        this.value = reaction && reaction.value || undefined;
        this.educts = reaction && reaction.educts || new Array<Ligand>();
        this.products = reaction && reaction.products || new Array<Ligand>();
    }
}

export class Ligand {
    id: string;
    name: string;
    role: string;
    schema: string;
    smiles: string;
    imageUrl: string;

    constructor(ligand?: Ligand) {
        this.id = ligand && ligand.id || undefined;
        this.name = ligand && ligand.name || undefined;
        this.role = ligand && ligand.role || undefined;
        this.schema = ligand && ligand.schema || undefined;
        this.smiles = ligand && ligand.smiles || undefined;
        this.imageUrl = ligand && ligand.imageUrl || undefined;
    }
}

export class Reagent {
    ligandId: string;
    name: string;
    formula: string;
    smiles: string;
    concentration: number;
    unit: string;
    role: string;
    imageUrl: string;
    brendaLink: string;

    constructor(reagent?: Reagent) {
        this.ligandId = reagent && reagent.ligandId || undefined;
        this.name = reagent && reagent.name || undefined;
        this.formula = reagent && reagent.formula || undefined;
        this.smiles = reagent && reagent.smiles || undefined;
        this.concentration = reagent && reagent.concentration || undefined;
        this.unit = reagent && reagent.unit || undefined;
        this.role = reagent && reagent.role || undefined;
        this.imageUrl = reagent && reagent.imageUrl || undefined;
        this.brendaLink = reagent && reagent.brendaLink || undefined;
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

export class ReactionCondition {
    name: string;
    temp: number;
    unit: string;
    ph: number;

    constructor(reactionCondition?: ReactionCondition) {
        this.name = reactionCondition && reactionCondition.name || undefined;
        this.temp = reactionCondition && reactionCondition.temp || undefined;
        this.unit = reactionCondition && reactionCondition.unit || undefined;
        this.ph = reactionCondition && reactionCondition.ph || undefined;
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
