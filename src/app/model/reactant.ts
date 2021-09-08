import {Attribute} from './attribute';

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
