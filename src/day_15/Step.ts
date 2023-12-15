export default class Step {
  private step: string;
  private hashMultiplicator: number;
  private _hashValue: number;
  private _operation: "remove" | "add";
  private _focal: number;
  private _label: string;

  constructor(step: string, hashMultiplicator: number = 17) {
    this.step = step;
    this.hashMultiplicator = hashMultiplicator;
    const splitStep = step.split(/[=-]/);
    this._operation = step.indexOf("=") > -1 ? "add" : "remove";
    this._focal = this._operation === "add" ? parseInt(splitStep[1]) : 0;
    this._label = splitStep[0];
    this._hashValue = this.calculateHash();
  }

  calculateHash = (): number => {
    let currentHashValue = 0;

    for (let i = 0; i < this._label.length; i++) {
      const asciiCode = this._label.charCodeAt(i);
      currentHashValue =
        ((asciiCode + currentHashValue) * this.hashMultiplicator) % 256;
    }

    return currentHashValue;
  };

  public get hashValue(): number {
    return this._hashValue;
  }

  public get operation(): "add" | "remove" {
    return this._operation;
  }

  public get focal(): number {
    return this._focal;
  }

  public get label(): string {
    return this._label;
  }
}
