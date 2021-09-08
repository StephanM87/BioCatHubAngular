import {Replicate} from './replicate';

export class Measurement {
  reagent: string;
  x_unit: string; // TODO no underscore variables
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
