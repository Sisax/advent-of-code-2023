import * as fs from "fs";
import { EOL } from "os";
import Wall from "./Wall";
import Light from "./Light";

const fileContent = fs.readFileSync("../inputs/day_16_test_input.txt", "utf-8");
const rawWall = fileContent.split(EOL).map((row) => row.split(""));

const wall = new Wall(rawWall);

// recursion seems like an easy thing to do but it might run out of call stack
// with a while loop i could go through each light beam one-by-one, with dreading part 2
// or while there is a legal step, i could go through each current light beams next step
// for this, create a lightbeam class which memorizez the location and the direction of the light, hitting a splitter creates another instance
// while there is instantiated light beams in the light beam list, do a step

// instantiate first light
const lightBeams: Light[] = [new Light("right", 0, 0)];

while (lightBeams.length > 0) {
  // first just go through one beams life, then we worry about instantiating new ones
  lightBeams.forEach((light, lightBeamIndex) => {
    const currentTile = wall.getTileByLocation(light.row, light.col);
    console.log(currentTile);
    if (currentTile === undefined) {
      lightBeams.splice(lightBeamIndex, 1);
    } else {
      currentTile.isEnergized = true;
      const directions = currentTile.getNextLocation(light);
      directions.forEach((direction, index) => {
        if (index !== 0) {
          const newLight = new Light(direction[2], direction[0], direction[1]);
          lightBeams.push(newLight);
        } else {
          // check if row or col is out of bounds
          if (
            direction[0] > rawWall.length - 1 ||
            direction[0] < 0 ||
            direction[1] > rawWall[0].length - 1 ||
            direction[1] < 0
          ) {
            console.log("egybul itt van");
            lightBeams.splice(lightBeamIndex, 1);
          } else {
            light.row = direction[0];
            light.col = direction[1];
            light.direction = direction[2];
          }
        }
      });
    }
  });
}

wall.printWall();
