import * as fs from 'fs';
import { EOL } from 'os';

const fileContent = fs.readFileSync('../inputs/day_9_input.txt', 'utf-8');
const rows = fileContent.split(EOL);

const main = (rows: string[]) => {
  let sumOfNextValues = 0;

  rows.forEach(row => {
    const parsedRow = row.split(' ').map(value => parseInt(value))
    const nextValue = handleRow(parsedRow);

    sumOfNextValues += nextValue;
  })

  console.log('The sum of all future values is: ', sumOfNextValues);
}

const handleRow = (row: number[]): number => {
  if (row.every(value => value === 0) || row.length < 1) {
    return 0;
  }

  const differences = row.map((value, index) => {
    if (index === row.length - 1) {
      return null;
    }

    return row[index + 1] - value;
  }).filter(value => value !== null);

  return row[0] - handleRow(differences);
}

main(rows);