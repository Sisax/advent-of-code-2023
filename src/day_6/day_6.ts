import { times, distances } from "../inputs/day_6_input_part_2";

main(times, distances);

function main(times: number[], distances: number[]) {
  const waysToBeatRecord: number[] = [];

  for (let i = 0; i < times.length; i++) {
    const currentTime = times[i];
    const currentRecordDistance = distances[i];
    let waysToBeatCurrentRecord = 0;

    // j is the current speed (mm/ms)
    for (let j = 1; j < currentTime; j++) {
      const timeLeft = currentTime - j;
      if (j * timeLeft > currentRecordDistance) {
        waysToBeatCurrentRecord++;
      }
    }

    waysToBeatRecord.push(waysToBeatCurrentRecord);
  }

  const multiplicationOfWays = waysToBeatRecord.reduce((prev, curr) => prev * curr, 1);
  console.log('The multiplication of the ways to beat the current record is: ', multiplicationOfWays);
}