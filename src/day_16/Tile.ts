import Light, { Direction } from "./Light";

export default class Tile {
  private _tile: string;
  private _i: number;
  private _j: number;
  public isEnergized: boolean;

  constructor(tile: string, location: [number, number]) {
    this._tile = tile;
    this._i = location[0];
    this._j = location[1];
    this.isEnergized = false;
  }

  public get tile(): string {
    return this._tile;
  }

  public get i(): number {
    return this._i;
  }

  public get j(): number {
    return this._j;
  }

  // tought: we can return an array of locations, the first one being the original lights new location
  // we have a second one if there should be a new instance of light with that coords
  public getNextLocation = (light: Light): [number, number, Direction][] => {
    const result: [number, number, Direction][] = [];

    // this is what you don't do in a real scenario lol
    switch (this._tile) {
      case ".":
        if (light.direction === "down")
          result.push([light.row + 1, light.col, "down"]);
        if (light.direction === "up")
          result.push([light.row - 1, light.col, "up"]);
        if (light.direction === "left")
          result.push([light.row, light.col - 1, "left"]);
        if (light.direction === "right")
          result.push([light.row, light.col + 1, "right"]);
        break;
      case "\\":
        if (light.direction === "down")
          result.push([light.row, light.col + 1, "right"]);
        if (light.direction === "up")
          result.push([light.row, light.col - 1, "left"]);
        if (light.direction === "left")
          result.push([light.row - 1, light.col, "up"]);
        if (light.direction === "right")
          result.push([light.row + 1, light.col, "down"]);
        break;
      case "/":
        if (light.direction === "down")
          result.push([light.row, light.col - 1, "left"]);
        if (light.direction === "up")
          result.push([light.row, light.col + 1, "right"]);
        if (light.direction === "left")
          result.push([light.row + 1, light.col, "down"]);
        if (light.direction === "right")
          result.push([light.row - 1, light.col, "up"]);
        break;
      case "|":
        if (light.direction === "down")
          result.push([light.row + 1, light.col, "down"]);
        if (light.direction === "up")
          result.push([light.row - 1, light.col, "up"]);
        if (light.direction === "left" || light.direction === "right") {
          result.push([light.row + 1, light.col, "down"]);
          result.push([light.row - 1, light.col, "up"]);
        }
        break;
      case "-":
        if (light.direction === "left")
          result.push([light.row, light.col - 1, "left"]);
        if (light.direction === "right")
          result.push([light.row, light.col + 1, "right"]);
        if (light.direction === "down" || light.direction === "up") {
          result.push([light.row, light.col - 1, "up"]);
          result.push([light.row, light.col + 1, "down"]);
        }
        break;
      default:
        console.error("non existant tile");
        break;
    }

    return result;
  };
}
