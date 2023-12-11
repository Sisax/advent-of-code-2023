export default class Galaxy {
  private _name: number;
  private _locationYX: [number, number];

  constructor(name: number, locationYX: [number, number]) {
    this._name = name;
    this._locationYX = locationYX;
  }

  public get name(): number {
    return this._name;
  }

  public get locationYX(): [number, number] {
    return this._locationYX;
  }
}
