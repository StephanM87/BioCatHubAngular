import {Reactant} from './reactant';

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
