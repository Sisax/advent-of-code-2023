import * as fs from "fs";
import { EOL } from "os";
import Cluster from "./Cluster";

const fileContent = fs.readFileSync("../inputs/day_11_input.txt", "utf-8");
const rows = fileContent.split(EOL).map((row) => row.split(""));

const main = (skyMap: string[][]) => {
  const expandedSkyMap = expandSky(skyMap);
  const galaxyCluster = new Cluster(expandedSkyMap);
  let galaxyNumber = 1;
  expandedSkyMap.forEach((row, i) => {
    row.forEach((star, j) => {
      if (star === "#") {
        galaxyCluster.addGalaxy(galaxyNumber, [i, j]);
        galaxyNumber++;
      }
    });
  });
  const partOneResult = galaxyCluster.countAllPossibleDistances(1000000);
  console.log("The sum of the galaxy distances is: ", partOneResult);
};

const expandSky = (skyMap: string[][]): string[][] => {
  const expandingColumns: number[] = [];

  for (let i = 0; i < skyMap[0].length; i++) {
    // i is the col number
    // figure out if the current col needs duplicating
    let isEmpty = true;
    for (let j = 0; j < skyMap.length; j++) {
      // j is the row number
      if (skyMap[j][i] == "#") {
        isEmpty = false;

        break;
      }
    }

    if (isEmpty) {
      expandingColumns.push(i);
    }
  }

  // expand rows, note to self: when passing arrays, always spread it...
  // WHY DIDNT I THINK OF THIS SOOOONER? :'D
  // leave the expansion of the array, just insert the expanding lines and cols with another char
  // and count those as X on the distance counting

  const result = skyMap.map((row, i) => {
    if (row.every((value) => value === ".")) {
      return row.map(() => "*");
    }

    return row.map((star, j) => {
      if (expandingColumns.includes(j)) {
        return "*";
      }

      return star;
    });
  });

  return result;
};

main(rows);
