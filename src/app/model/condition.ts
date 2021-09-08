import {Attribute} from './attribute';
import {BufferSolution} from './buffer-solution';

export class Condition {
  temp: number;
  unit: string;
  ph: number;
  buffer: BufferSolution;
  others: Array<Attribute>;

  constructor(condition?: Condition) {
    this.temp = condition?.temp;
    this.unit = condition?.unit;
    this.ph = condition?.ph;
    this.buffer = condition?.buffer || new BufferSolution();
    this.others = condition?.others || new Array<Attribute>();
  }
}
