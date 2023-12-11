import Galaxy from "./Galaxy";

export default class Cluster {
  private galaxies: Galaxy[];
  private distancesByGalaxyPair: {
    [key: string]: number;
  };
  private skyMap: string[][];

  constructor(skyMap: string[][]) {
    this.skyMap = skyMap;
    this.galaxies = [];
    this.distancesByGalaxyPair = {};
  }

  public addGalaxy = (name: number, locationYX: [number, number]): void => {
    const createdGalaxy = new Galaxy(name, locationYX);
    this.galaxies.push(createdGalaxy);
  };

  public countAllPossibleDistances = (expansion: number): number => {
    let result = 0;

    this.galaxies.forEach((galaxy, i) => {
      for (let j = 0; j < this.galaxies.length; j++) {
        if (i === j) {
          continue;
        }

        const pairName = galaxy.name + ":" + this.galaxies[j].name;
        const possiblyExistingName = this.galaxies[j].name + ":" + galaxy.name;

        if (!this.distancesByGalaxyPair.hasOwnProperty(possiblyExistingName)) {
          this.distancesByGalaxyPair[pairName] = this.countDistance(
            galaxy.locationYX,
            this.galaxies[j].locationYX,
            expansion
          );
        }
      }
    });

    for (const pair in this.distancesByGalaxyPair) {
      result += this.distancesByGalaxyPair[pair];
    }

    return result;
  };

  private countDistance = (
    a: [number, number],
    b: [number, number],
    expansion: number
  ): number => {
    let distance = 0;

    for (let i = 1; i <= Math.abs(a[0] - b[0]); i++) {
      const modifierY = a[0] - b[0] > 0 ? -i : i;
      if (this.skyMap[a[0] + modifierY][a[1]] === "*") {
        distance += expansion;
      } else {
        distance++;
      }
    }

    for (let i = 0; i < Math.abs(a[1] - b[1]); i++) {
      const modifierX = a[1] - b[1] > 0 ? -i : i;
      if (this.skyMap[b[0]][a[1] + modifierX] === "*") {
        distance += expansion;
      } else {
        distance++;
      }
    }

    return distance;
  };
}
