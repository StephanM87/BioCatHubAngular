export class Replicate {
  x_value: number;
  y_values: Array<number>;

  constructor(replicate?: Replicate) {
    this.x_value = replicate?.x_value;
    this.y_values = replicate?.y_values || new Array<number>();
  }
}
