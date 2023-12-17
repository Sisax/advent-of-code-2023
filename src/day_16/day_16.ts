import * as fs from "fs";
import { EOL } from "os";
import Wall from "./Wall";
import Light, { Direction } from "./Light";

const fileContent = fs.readFileSync("../inputs/day_16_input.txt", "utf-8");
const rawWall = fileContent.split(EOL).map((row) => row.split(""));

// recursion seems like an easy thing to do but it might run out of call stack
// with a while loop i could go through each light beam one-by-one, with dreading part 2
// or while there is a legal step, i could go through each current light beams next step
// for this, create a lightbeam class which memorizez the location and the direction of the light, hitting a splitter creates another instance
// while there is instantiated light beams in the light beam list, do a step

const main = () => {
  let result = 0;

  rawWall[0].forEach((_, index) => {
    const energizedFieldsFromTop = sendLightTroughWall(0, index, "down");
    const energizedFieldsFromBottom = sendLightTroughWall(
      rawWall.length - 1,
      index,
      "up"
    );

    const energizedFields = Math.max(
      energizedFieldsFromBottom,
      energizedFieldsFromTop
    );

    if (result < energizedFields) {
      result = energizedFields;
    }
  });

  rawWall.forEach((_, index) => {
    const energizedFieldsFromLeft = sendLightTroughWall(index, 0, "right");
    const energizedFieldsFromRight = sendLightTroughWall(
      index,
      rawWall[index].length - 1,
      "left"
    );

    const energizedFields = Math.max(
      energizedFieldsFromLeft,
      energizedFieldsFromRight
    );

    if (result < energizedFields) {
      result = energizedFields;
    }
  });

  console.log("The most amount of energized fields possible is: ", result);
};

const sendLightTroughWall = (
  startingRowIndex: number,
  startingColIndex: number,
  startingDirection: Direction
): number => {
  const wall = new Wall(rawWall);
  // instantiate first light
  let lightBeams: Light[] = [
    new Light(startingDirection, startingRowIndex, startingColIndex),
  ];

  // i can implement it in a way that we just do the foreach light and go through each ligth one by one
  // while (lightBeams.length > 0) {
  // first just go through one beams life, then we worry about instantiating new ones
  let lightIndex = 0;
  while (lightIndex < lightBeams.length) {
    const light = lightBeams[lightIndex];
    let currentTile = wall.getTileByLocation(light.row, light.col);
    currentTile.isEnergized = true;
    const directions = currentTile.getNextLocation(light);
    currentTile.tilePassedBy.push(light.direction);

    directions.forEach((direction) => {
      const nextDirectionsTile = wall.getTileByLocation(
        direction[0],
        direction[1]
      );
      if (
        nextDirectionsTile !== undefined &&
        !nextDirectionsTile.tilePassedBy.includes(direction[2])
      ) {
        const newLight = new Light(direction[2], direction[0], direction[1]);
        lightBeams.push(newLight);
      }
    });

    lightIndex++;
  }

  return wall.getNumberOfEnergizedTiles();
};

main();
