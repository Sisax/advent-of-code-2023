export type Direction = "up" | "down" | "left" | "right";

export default class Light {
  public direction: Direction;
  public row: number;
  public col: number;

  constructor(direction: Direction, row: number, col: number) {
    this.direction = direction;
    this.row = row;
    this.col = col;
  }
}
