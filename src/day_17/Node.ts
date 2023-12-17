import { EOL } from "os";

export default class Node {
  private _i: number;
  private _j: number;
  private _point: number;
  public isUnvisited: boolean;
  public distance: number;
  public previous: Node;
  public neighbors: Node[];

  constructor(i: number, j: number, point: number) {
    this._i = i;
    this._j = j;
    this._point = point;
    this.isUnvisited = true;
    this.distance = 9999999999;
    this.previous = undefined;
    this.neighbors = [];
  }

  public get i(): number {
    return this._i;
  }

  public get j(): number {
    return this._j;
  }

  public get point(): number {
    return this._point;
  }

  public calculateDistance = (node: Node) => {
    let distance = node.distance + this.distance;
    return distance;
  };

  public calculateNeighbours = (allNeighbors: Node[][]): void => {
    let i = this.i;
    let j = this.j;
    if (i < allNeighbors.length - 1) {
      this.neighbors.push(allNeighbors[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(allNeighbors[i - 1][j]);
    }
    if (j < allNeighbors[i].length - 1) {
      this.neighbors.push(allNeighbors[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(allNeighbors[i][j - 1]);
    }
  };
}
