// TODO one file per class convention
export class Attribute {
  key: string;
  value: string;

  constructor(attribute?: Attribute) {
    this.key = attribute?.key;
    this.value = attribute?.value;
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
    this.ecNumber = enzyme?.ecNumber;
    this.name = enzyme?.name;
    this.type = enzyme?.type;
    this.variant = enzyme?.variant;
    this.organism = enzyme?.organism;
    this.sequence = enzyme?.sequence;
    this.concentration = enzyme?.concentration;
    this.unit = enzyme?.unit;
    this.formulation = enzyme?.formulation;
    this.method = enzyme?.method;
    this.others = enzyme?.others || new Array<Attribute>();
    this.reaction = enzyme?.reaction || new Reaction();
  }
}

export class Reaction {
  value: string;
  educts: Array<Reactant>;
  products: Array<Reactant>;

  constructor(reaction?: Reaction) {
    this.value = reaction?.value;
    this.educts = reaction?.educts || new Array<Reactant>();
    this.products = reaction?.products || new Array<Reactant>();
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
    this.id = reactant?.id;
    this.name = reactant?.name;
    this.role = reactant?.role;
    this.concentration = reactant?.concentration;
    this.unit = reactant?.unit;
    this.purity = reactant?.purity;
    this.supplier = reactant?.supplier;
    this.formula = reactant?.formula;
    this.smiles = reactant?.smiles;
    this.imageUrl = reactant?.imageUrl;
    this.others = reactant?.others || new Array<Attribute>();
  }
}

export class Vessel {
  type: string;
  volume: number;
  unit: string;
  others: Array<Attribute>;

  constructor(vessel?: Vessel) {
    this.type = vessel?.type;
    this.volume = vessel?.volume;
    this.unit = vessel?.unit;
    this.others = vessel?.others || new Array<Attribute>();
  }
}

export class Buffer {
  type: string;
  concentration: number;
  unit: string;

  constructor(buffer?: Buffer) {
    this.type = buffer?.type;
    this.concentration = buffer?.concentration;
    this.unit = buffer?.unit;
  }
}

export class Condition {
  temp: number;
  unit: string;
  ph: number;
  buffer: Buffer;
  others: Array<Attribute>;

  constructor(condition?: Condition) {
    this.temp = condition?.temp;
    this.unit = condition?.unit;
    this.ph = condition?.ph;
    this.buffer = condition?.buffer || new Buffer();
    this.others = condition?.others || new Array<Attribute>();
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
    this.reagent = measurement?.reagent;
    this.x_unit = measurement?.x_unit;
    this.x_name = measurement?.x_name;
    this.y_unit = measurement?.y_unit;
    this.y_name = measurement?.y_name;
    this.replicates = measurement?.replicates || new Array<Replicate>();
    this.notes = measurement?.notes;
    this.plotStyle = measurement?.plotStyle || 'point';
  }
}

export class Replicate {
  x_value: number;
  y_values: Array<number>;

  constructor(replicate?: Replicate) {
    this.x_value = replicate?.x_value;
    this.y_values = replicate?.y_values || new Array<number>();
  }
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
  institution: string;

  constructor(user?: User) {
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.institution = user?.institution;
  }
}
