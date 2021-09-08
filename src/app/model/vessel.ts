import {Attribute} from './attribute';

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
