import * as fs from 'fs';
import { EOL } from 'os';

const fileContent = fs.readFileSync('./inputs/day_1_input.txt', 'utf-8');

const rows = fileContent.split(EOL);
let result = 0;

rows.forEach(row => {
  const alteredRow = getRealCalibrationRow(row)
  const calibrationNumber = calculateCalibrationNumber(alteredRow);
  result = result + parseInt(calibrationNumber);
})

console.log("Yupppee", result);
// check egyenkent a mezoket
// ha a value szam, azt veszem az elso erteknek

function getRealCalibrationRow(row: string): string {
  const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const wordValues: {[key: string]: string} = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
  }
  let alteredRow = row;
  let resultRow = '';

  while (alteredRow.length > 0) {
    numberWords.forEach(word => {
      if (alteredRow.startsWith(word)) {
        resultRow += wordValues[word];
      }
    })

    alteredRow = alteredRow.slice(1)
  }

  return resultRow;
}

function isFistNumber(char: string, firstNumber: number): boolean {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  return numbers.includes(char) && isNaN(firstNumber);
}

function calculateCalibrationNumber(row: string): string {
  const chars = row.split('');
  let firstNumber = NaN;
  let lastNumber = 0;
  chars.forEach(char => {
    if (isFistNumber(char, firstNumber)) {
      firstNumber = parseInt(char);
    }
    if (!isNaN(parseInt(char))) {
      lastNumber = parseInt(char);
    }
  })

  const concatenatedNumbers = '' + firstNumber + lastNumber;
  console.log('ez a sor:', row)
  console.log('firstnumber', firstNumber)
  console.log('lastnumber', lastNumber)
  console.log('concatenatednumbers', concatenatedNumbers)
  return concatenatedNumbers;
}
