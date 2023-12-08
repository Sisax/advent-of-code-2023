import * as fs from 'fs';
import { EOL } from 'os';

const lcm = require('compute-lcm');

const fileContent = fs.readFileSync('../inputs/day_8_input.txt', 'utf-8');
const rows = fileContent.split(EOL);

const directions = rows[0];
const rawMap = rows.slice(2);

type ParsedMap = {
  [key: string]: string[]
}

const main = (rawDirections: string, rawMap: string[]): void => {
  const map: ParsedMap = parseRawMap(rawMap);
  const directionIndices = rawDirections.split('').map((direction) => direction === 'L' ? 0 : 1);

  const startingLocationRegex = /^..A$/;
  const destinationRegex = /^..Z$/;
  const startingKeys = Object.keys(map).filter(key => key.match(startingLocationRegex));
  const stepsForEachKey: number[] = [];

  startingKeys.forEach(startingKey => {
    let currentLocation = startingKey;
    let stepsTaken = 0;

    while (!currentLocation.match(destinationRegex)) {
      const currentDirection = directionIndices[stepsTaken % directionIndices.length];

      currentLocation = map[currentLocation][currentDirection];

      stepsTaken++;
    }

    stepsForEachKey.push(stepsTaken);
  })

  const stepsNeeded = lcm(stepsForEachKey);
  console.log('Steps taken:', stepsNeeded);
}

const parseRawMap = (rawMap: string[]): ParsedMap => {
  const parsedMap: ParsedMap = {};

  rawMap.forEach(entry => {
    const [key, rawValue] = entry.split(' = ');
    const value = rawValue.slice(1, -1).split(', ');
    parsedMap[key] = value;
  })

  return parsedMap;
}

main(directions, rawMap);