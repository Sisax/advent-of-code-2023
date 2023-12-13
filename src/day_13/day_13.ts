import * as fs from "fs";

const fileContent = fs.readFileSync("../inputs/day_13_input.txt", "utf-8");
const note = fileContent.split("\n\n").map((row) => row.split("\n"));
console.log(note.length);

const main = (notes: string[][]) => {
  let rowsAboveMirror = 0;

  let numberOfHorizontal = 0;
  notes.forEach((note) => {
    // find the matching row and prove its a mirror

    let mirrorIndex = 0;
    let smudgeFound = false;
    const mirrorIndices: number[] = [];
    while (note[mirrorIndex + 1] !== undefined) {
      // ezzel kell majd mokolnom
      if (smudgeFound) {
        let differences = countDifferences(
          note[mirrorIndex],
          note[mirrorIndex + 1]
        );
        if (differences === 0) {
          mirrorIndices.push(mirrorIndex);
        }
      } else {
        let differences = countDifferences(
          note[mirrorIndex],
          note[mirrorIndex + 1]
        );
        if (differences === 1) {
          smudgeFound = true;
          mirrorIndices.push(mirrorIndex);
        } else if (differences === 0) {
          mirrorIndices.push(mirrorIndex);
        }
      }
      mirrorIndex++;
    }

    for (let i = 0; i < mirrorIndices.length; i++) {
      const currentIndex = mirrorIndices[i];
      if (note[currentIndex] !== undefined) {
        let indexDiff = 1;
        let isMirrored = true;
        while (
          currentIndex - indexDiff >= 0 &&
          currentIndex + indexDiff + 1 < note.length
        ) {
          let differences = countDifferences(
            note[currentIndex - indexDiff],
            note[currentIndex + indexDiff + 1]
          );
          if (smudgeFound) {
            if (differences > 0) isMirrored = false;
            break;
          } else {
            if (differences === 1) {
              smudgeFound = true;
            } else if (differences > 0) {
              isMirrored = false;
            }
          }

          indexDiff++;
        }
        if (isMirrored) {
          rowsAboveMirror += currentIndex + 1;
          numberOfHorizontal++;
          break;
        }
      }
    }
  });

  console.log(rowsAboveMirror * 100);

  let columnsLeftOfMirror = 0;
  let numberOfVertical = 0;
  notes.forEach((note) => {
    const rotatedNote = rotateNote(note);
    // find the matching row and prove its a mirror

    let mirrorIndex = 0;
    let smudgeFound = false;
    const mirrorIndices: number[] = [];
    while (rotatedNote[mirrorIndex + 1] !== undefined) {
      if (smudgeFound) {
        let differences = countDifferences(
          rotatedNote[mirrorIndex],
          rotatedNote[mirrorIndex + 1]
        );
        if (differences === 0) {
          mirrorIndices.push(mirrorIndex);
        }
      } else {
        let differences = countDifferences(
          rotatedNote[mirrorIndex],
          rotatedNote[mirrorIndex + 1]
        );
        if (differences === 1) {
          smudgeFound = true;
          mirrorIndices.push(mirrorIndex);
        } else if (differences === 0) {
          mirrorIndices.push(mirrorIndex);
        }
      }
      if (
        countDifferences(rotatedNote[mirrorIndex], rotatedNote[mirrorIndex + 1])
      ) {
        console.log(1, rotatedNote[mirrorIndex]);
        console.log(2, rotatedNote[mirrorIndex + 1]);
        mirrorIndices.push(mirrorIndex);
      }
      mirrorIndex++;
    }

    for (let i = 0; i < mirrorIndices.length; i++) {
      const currentIndex = mirrorIndices[i];
      if (rotatedNote[currentIndex] !== undefined) {
        let indexDiff = 1;
        let isMirrored = true;
        while (
          currentIndex - indexDiff >= 0 &&
          currentIndex + indexDiff + 1 < rotatedNote.length
        ) {
          let differences = countDifferences(
            rotatedNote[currentIndex - indexDiff],
            rotatedNote[currentIndex + indexDiff + 1]
          );
          if (smudgeFound) {
            if (differences > 0) isMirrored = false;
            break;
          } else {
            if (differences === 1) {
              smudgeFound = true;
            } else if (differences > 0) {
              isMirrored = false;
            }
          }

          indexDiff++;
        }
        if (isMirrored) {
          columnsLeftOfMirror += currentIndex + 1;
          numberOfVertical++;
          break;
        }
      }
    }
  });
  console.log(columnsLeftOfMirror);
  console.log(rowsAboveMirror * 100 + columnsLeftOfMirror);
  console.log("horizontal ", numberOfHorizontal);
  console.log("vertical", numberOfVertical);
};

const countDifferences = (first: string, second: string): number => {
  let differences = 0;

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) {
      differences++;
    }
  }

  return differences;
};

const rotateNote = (note: string[]): string[] => {
  const noteLength = note.length;
  const rowLength = note[0].length;

  const rotatedNote: string[][] = [];
  for (let i = 0; i < rowLength; i++) {
    rotatedNote[i] = [];
    for (let j = 0; j < noteLength; j++) {
      rotatedNote[i][j] = note[j][i];
    }
  }

  for (let i = 0; i < rowLength; i++) {
    rotatedNote[i].reverse();
  }

  return rotatedNote.map((row) => row.join(""));
};

main(note);
