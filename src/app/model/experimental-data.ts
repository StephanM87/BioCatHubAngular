import {Measurement} from './measurement';

export class ExperimentalData {
  measurements: Array<Measurement>;

  constructor(experimentalData?: ExperimentalData) {
    this.measurements = experimentalData && experimentalData.measurements || new Array<Measurement>();
  }
}
