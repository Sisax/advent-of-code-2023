import * as fs from 'fs';
import { EOL } from 'os';
import PointCounter from './PointCounter';

const fileContent = fs.readFileSync('../inputs/day_4_input.txt', 'utf-8');

const rows = fileContent.split(EOL);
const sanitizedRows = rows.map((row) => row.split(': ')[1].trim())

main(sanitizedRows);

function main(rows: string[]) {
  const pointCounter = new PointCounter(rows);
  pointCounter.printResult();
  pointCounter.printResultForPartTwo();
}
