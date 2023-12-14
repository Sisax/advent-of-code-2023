import * as fs from "fs";
import { EOL } from "os";

const fileContent = fs.readFileSync("../inputs/day_14_input.txt", "utf-8");
const rows = fileContent.split(EOL).map((row) => row.split(""));

const main = (dish: string[][]) => {
  // first, move all round rocks to the northest place possible, Part 2: spin it in counterclockwise circles
  const cycleCount = 1000;
  for (let i = 0; i < cycleCount; i++) {
    spinDish(dish);
  }

  let result = 0;

  for (let i = dish.length - 1; i >= 0; i--) {
    for (let j = 0; j < dish.length; j++) {
      if (dish[i][j] === "O") {
        result += dish.length - i;
      }
    }
  }

  console.log("The final look of the dish:");
  console.log(dish.join(EOL));
  console.log("The load of the northern beam is: ", result);
};

const spinDish = (dish: string[][]) => {
  const directions = ["up", "left", "down", "right"];
  directions.forEach((direction) => {
    for (let i = 0; i < dish[0].length; i++) {
      for (let j = 0; j < dish.length; j++) {
        let currentVerticalIndex = j;
        let currentHorizontalIndex = i;
        switch (direction) {
          case "up":
            if (dish[j][i] === "O") {
              while (swapUp(dish, currentVerticalIndex, i)) {
                currentVerticalIndex--;
              }
            }
            break;
          case "left":
            if (dish[j][i] === "O") {
              while (swapLeft(dish, j, currentHorizontalIndex)) {
                currentHorizontalIndex--;
              }
            }
            break;
          case "down":
            let verticalIndexToUse = dish.length - 1 - currentVerticalIndex;
            if (dish[verticalIndexToUse][i] === "O") {
              while (swapDown(dish, verticalIndexToUse, i)) {
                verticalIndexToUse++;
              }
            }
            break;
          case "right":
            let horizontalIndexToUse =
              dish[0].length - 1 - currentHorizontalIndex;
            if (dish[j][horizontalIndexToUse] === "O") {
              while (
                swapRight(dish, currentVerticalIndex, horizontalIndexToUse)
              ) {
                horizontalIndexToUse++;
              }
            }
            break;
          default:
            break;
        }
      }
    }
  });
};

const swapUp = (
  matrix: string[][],
  vertical: number,
  horizontal: number
): boolean => {
  if (vertical < 1 || ["O", "#"].includes(matrix[vertical - 1][horizontal])) {
    return false;
  }

  let temp = matrix[vertical - 1][horizontal];
  matrix[vertical - 1][horizontal] = matrix[vertical][horizontal];
  matrix[vertical][horizontal] = temp;

  return true;
};

const swapDown = (
  matrix: string[][],
  vertical: number,
  horizontal: number
): boolean => {
  if (
    vertical > matrix.length - 2 ||
    ["O", "#"].includes(matrix[vertical + 1][horizontal])
  ) {
    return false;
  }

  let temp = matrix[vertical + 1][horizontal];
  matrix[vertical + 1][horizontal] = matrix[vertical][horizontal];
  matrix[vertical][horizontal] = temp;

  return true;
};

const swapRight = (
  matrix: string[][],
  vertical: number,
  horizontal: number
): boolean => {
  if (
    horizontal > matrix[0].length - 2 ||
    ["O", "#"].includes(matrix[vertical][horizontal + 1])
  ) {
    return false;
  }

  let temp = matrix[vertical][horizontal + 1];
  matrix[vertical][horizontal + 1] = matrix[vertical][horizontal];
  matrix[vertical][horizontal] = temp;

  return true;
};

const swapLeft = (
  matrix: string[][],
  vertical: number,
  horizontal: number
): boolean => {
  if (horizontal < 1 || ["O", "#"].includes(matrix[vertical][horizontal - 1])) {
    return false;
  }

  let temp = matrix[vertical][horizontal - 1];
  matrix[vertical][horizontal - 1] = matrix[vertical][horizontal];
  matrix[vertical][horizontal] = temp;

  return true;
};

main(rows);
