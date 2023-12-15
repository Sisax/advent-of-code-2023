import * as fs from "fs";
import { EOL } from "os";
import Step from "./Step";

const fileContent = fs.readFileSync("../inputs/day_15_input.txt", "utf-8");
const vulcanoInitializationSequence = fileContent.split(",");

// PART 1:
// loop trough input
// loop trough entry
// get ASCII code of i-th character
// add ASCII number to the prev value (remainder of prev % 256)
// multiply by 17
// get remainder of current % 256
// exit loop -> store the last value
// sum all values

// i would do it OOP, to reduce cost and be more open to part 2

const main = (vulcanoInitializationSequence: string[]): void => {
  const sequenceSteps: Step[] = [];
  for (let i = 0; i < vulcanoInitializationSequence.length; i++) {
    const currentStep = new Step(vulcanoInitializationSequence[i]);
    sequenceSteps.push(currentStep);
  }

  const boxes: { [key: number]: { [key: string]: number } } = {};
  let result = 0;
  sequenceSteps.forEach((step) => {
    // part 1 result
    result += step.hashValue;

    if (!boxes.hasOwnProperty(step.hashValue)) {
      boxes[step.hashValue] = {};
    }

    if (step.operation === "add") {
      boxes[step.hashValue][step.label] = step.focal;
    }

    if (
      step.operation === "remove" &&
      boxes[step.hashValue].hasOwnProperty(step.label)
    ) {
      delete boxes[step.hashValue][step.label];
    }
  });

  // this is incorrect since Part 2 changes
  console.log(
    "The HASH of the lava production initialization sequence is: ",
    result
  );

  let focusingPowerSum = 0;

  // if this throws an error i might have to filer out all empty boxes
  for (const box in boxes) {
    let slotNumber = 1;
    for (const lens in boxes[box]) {
      const focusingPower = (parseInt(box) + 1) * slotNumber * boxes[box][lens];
      focusingPowerSum += focusingPower;
      slotNumber++;
    }
  }

  console.log(
    "The focusing power of lense configuration is: ",
    focusingPowerSum
  );
};

main(vulcanoInitializationSequence);
