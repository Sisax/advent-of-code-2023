import Tile from "./Tile";

export default class Wall {
  private tiles: Tile[];

  constructor(rawWall: string[][]) {
    this.tiles = this.parseRawWall(rawWall);
  }

  private parseRawWall = (rawWall: string[][]) => {
    const result: Tile[] = [];

    for (let i = 0; i < rawWall.length; i++) {
      for (let j = 0; j < rawWall[i].length; j++) {
        result.push(new Tile(rawWall[i][j], [i, j]));
      }
    }

    return result;
  };

  // this is the slow oop way, if this will be too slow, refactor to hashmap by location
  public getTileByLocation = (row: number, col: number): Tile => {
    return this.tiles.filter((tile) => tile.i === row && tile.j === col)[0];
  };

  public getNumberOfEnergizedTiles = (): number => {
    let points = 0;

    this.tiles.forEach((tile) => {
      if (tile.isEnergized) {
        points++;
      }
    });

    return points;
  };
}
