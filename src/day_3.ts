import * as fs from 'fs';
import { EOL } from 'os';

const fileContent = fs.readFileSync('./inputs/day_3_input.txt', 'utf-8');

const rows = fileContent.split(EOL);

main(rows);

function main(rows: string[]) {
  const partNumbers: number[] = [];
  const gearNumbers: {[key: string]: number[]} = {
    // example entry:
    // '4:32': [623, 74]
  }
  rows.forEach((row, rowIndex) => {
    const chars = row.split('');
    for (let i = 0; i < chars.length; i++) {
      // get numbers X
      if (isNumber(chars[i])) {
        let currentNumber = chars[i]
        let lastNumberIndex = i;
        while (isNumber(chars[lastNumberIndex + 1])) {
          currentNumber += chars[lastNumberIndex + 1];
          lastNumberIndex++;
        }

        // check if the neighbouring indices contain anything other than numbers or dots
        // boundaries:
        //   [rowIndex - 1][i - 1] - [rowIndex - 1][lastNumberIndex + 1]
        //   [rowIndex][i - 1] - [rowIndex][lastNumberIndex + 1]
        //   [rowIndex + 1][i - 1] - [rowIndex + 1][lastNumberIndex + 1]
        // join all, filter for characters that are not numbers or dots -> if not empty -> part number
        const firstHorizontalIndex = i > 0 ? i - 1 : i;
        const lastHorizontalIndex = lastNumberIndex < row.length - 1 ? lastNumberIndex + 1 : lastNumberIndex;
        const upperNeighbours = rowIndex > 0 ? rows[rowIndex - 1].slice(firstHorizontalIndex, lastHorizontalIndex + 1) : '';
        const horizontalNeighbours = rows[rowIndex].slice(firstHorizontalIndex, lastHorizontalIndex + 1);
        const lowerNeighbours = rowIndex < rows.length - 1 ? rows[rowIndex + 1].slice(firstHorizontalIndex, lastHorizontalIndex + 1) : '';
        const allNeighbours = upperNeighbours + horizontalNeighbours + lowerNeighbours;
        if (isPartNumber(allNeighbours)) {
          partNumbers.push(parseInt(currentNumber));
        }

        // part 2

        if (isNeighbourOfGearSymbol(allNeighbours)) {
          // I could save the number in an object to the coordinate of the gear symbol, and handle it after we collect it all
          // if the number will be too low, than there is a case where there are multiple neighbouring stars for some numbers ---- this was the case :)
          let gearContainingRowIndex = rowIndex;
          let gearContainingNeighbour = '';
          let gearCoordinates: string[] = [];

          const allUpperIndexes = getAllIndexes(upperNeighbours.split(''), '*');
          allUpperIndexes.forEach(index => {
            gearCoordinates.push(rowIndex - 1 + ':' + (firstHorizontalIndex + index))
          })
          const allHorizontalIndexes = getAllIndexes(horizontalNeighbours.split(''), '*');
          allHorizontalIndexes.forEach(index => {
            gearCoordinates.push(rowIndex + ':' + (firstHorizontalIndex + index))
          })
          const allLowerIndexes = getAllIndexes(lowerNeighbours.split(''), '*');
          allLowerIndexes.forEach(index => {
            gearCoordinates.push(rowIndex + 1 + ':' + (firstHorizontalIndex + index))
          })
          // if (horizontalNeighbours.indexOf('*') != -1) {
          //   gearContainingNeighbour = horizontalNeighbours;
          // } else if (upperNeighbours.indexOf('*') != -1) {
          //   gearContainingNeighbour = upperNeighbours;
          //   gearContainingRowIndex = rowIndex - 1;
          // } else {
          //   gearContainingNeighbour = lowerNeighbours;
          //   gearContainingRowIndex = rowIndex + 1;
          // }

          const indexOfGear = gearContainingNeighbour.indexOf('*') + firstHorizontalIndex;
          const gearNumbersKey = gearContainingRowIndex + ":" + indexOfGear;

          gearCoordinates.forEach(coordinate => {
            if (!gearNumbers.hasOwnProperty(coordinate)) {
              gearNumbers[coordinate] = [];
            }

            gearNumbers[coordinate].push(parseInt(currentNumber));
          })

        }

        i = lastNumberIndex;
      }
    }

  })
  const result = partNumbers.reduce((prev, curr) => prev + curr, 0);

  console.log('Sum of all part numbers is: ', result);
  console.log(gearNumbers);

  console.log('Sum of all gear ratios is: ', calculateSumOfGearRatios(gearNumbers));
}

function calculateSumOfGearRatios(gearNumbers: {[key: string]: number[]}): number {
  let result = 0;

  for (const gear in gearNumbers) {
    if (isValidGearPart(gearNumbers[gear])) {
      result += gearNumbers[gear][0] * gearNumbers[gear][1];
    }
  }

  return result;
}

// i need this helper for finding all neighbouring gears
function getAllIndexes(arr: string[], val: string): number[] {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

// a gearpart is only valid if it has two part numbers
function isValidGearPart(gearNumbers: number[]): boolean {
  return gearNumbers.length == 2;
}

function isNeighbourOfGearSymbol(allNeighbours: string): boolean {
  return allNeighbours.includes('*');
}

function isPartNumber(neighbours: string): boolean {
  const symbolsInNeighbours = neighbours.split('').filter((char) => !isNumber(char) && char !== '.').join();

  return symbolsInNeighbours != '';
}

function isNumber(char: string): boolean {
  return !isNaN(parseInt(char));
}