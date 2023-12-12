import * as fs from "fs";
import { EOL } from "os";

const fileContent = fs.readFileSync("../inputs/day_12_test_input.txt", "utf-8");
const rows = fileContent.split(EOL).map((row) => row.split(" "));

let resultMap: { [key: string]: number } = {};

const main = (rows: string[][]): void => {
  rows.forEach(([rawSprings, rule], i) => {
    const ruleSet = rule.split(",").map((rule) => parseInt(rule));
    const springs = rawSprings.split("");

    getPossibleCombinations(springs, ruleSet);
  });
  console.log("result", resultMap);
  const result = Object.values(resultMap).reduce(
    (prev, curr) => prev + curr,
    0
  );
  console.log("the sum of all possible combinations are: ", result);
};

const getPossibleCombinations = (
  springs: string[],
  ruleSet: number[],
  currentCombination: string[] = []
): void => {
  const lengthOfCombination = currentCombination.length;
  if (springs.length === lengthOfCombination) {
    //kitalalni a validaciot
    const brokenSpringArray = currentCombination
      .filter((spring, i) => {
        if (spring === "#") {
          return true;
        } else if (i > 0 && currentCombination[i - 1] === "#") {
          return true;
        }

        return false;
      })
      .join("")
      .split(".")
      .filter((spring) => spring != "");

    if (brokenSpringArray.length !== ruleSet.length) {
      return;
    }

    let fitsTheBill = true;
    for (let i = 0; i < brokenSpringArray.length; i++) {
      if (brokenSpringArray[i].length != ruleSet[i]) {
        fitsTheBill = false;
      }
    }

    if (!fitsTheBill) {
      return;
    }
    const currentKey = springs.join("");

    if (!resultMap.hasOwnProperty(currentKey)) {
      resultMap[currentKey] = 0;
    }

    resultMap[currentKey] += 1;

    return;
  }

  if (springs[lengthOfCombination] === "?") {
    getPossibleCombinations(springs, ruleSet, [...currentCombination, "."]);
    getPossibleCombinations(springs, ruleSet, [...currentCombination, "#"]);
  } else {
    getPossibleCombinations(springs, ruleSet, [
      ...currentCombination,
      springs[lengthOfCombination],
    ]);
  }
};

main(rows);
