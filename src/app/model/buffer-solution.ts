export class BufferSolution {
  type: string;
  concentration: number;
  unit: string;

  constructor(buffer?: BufferSolution) {
    this.type = buffer?.type;
    this.concentration = buffer?.concentration;
    this.unit = buffer?.unit;
  }
}
