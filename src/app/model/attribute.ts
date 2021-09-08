export class Attribute {
  key: string;
  value: string;

  constructor(attribute?: Attribute) {
    this.key = attribute?.key;
    this.value = attribute?.value;
  }
}
