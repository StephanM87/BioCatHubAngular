import {Attribute} from './attribute';
import {Reaction} from './reaction';

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
