import * as fs from "fs";
import { EOL } from "os";

const fileContent = fs.readFileSync("../inputs/day_10_input.txt", "utf-8");
const rows = fileContent.split(EOL);
// fromOrigin: [vertical Y, horizontal X]
const pathModifiersBySymbolsAndOrigins: {
  [key: string]: {
    [key: string]: { modifier: number[]; nextDirection: string };
  };
} = {
  "|": {
    above: {
      modifier: [1, 0],
      nextDirection: "above",
    },
    below: {
      modifier: [-1, 0],
      nextDirection: "below",
    },
  },
  "-": {
    left: {
      modifier: [0, 1],
      nextDirection: "left",
    },
    right: {
      modifier: [0, -1],
      nextDirection: "right",
    },
  },
  L: {
    above: {
      modifier: [0, 1],
      nextDirection: "left",
    },
    right: {
      modifier: [-1, 0],
      nextDirection: "below",
    },
  },
  J: {
    above: {
      modifier: [0, -1],
      nextDirection: "right",
    },
    left: {
      modifier: [-1, 0],
      nextDirection: "below",
    },
  },
  "7": {
    left: {
      modifier: [1, 0],
      nextDirection: "above",
    },
    below: {
      modifier: [0, -1],
      nextDirection: "right",
    },
  },
  F: {
    right: {
      modifier: [1, 0],
      nextDirection: "above",
    },
    below: {
      modifier: [0, 1],
      nextDirection: "left",
    },
  },
};

const legalNeighbours = {
  above: ["7", "|", "F"],
  right: ["J", "-", "7"],
  below: ["J", "|", "L"],
  left: ["L", "-", "F"],
};

const main = (rows: string[]): void => {
  const startingIndex = findStartingIndex(rows);
  const result = getStepsByTraversingMatrix(rows, startingIndex);
};

const getStepsByTraversingMatrix = (
  rows: string[],
  startingIndex: [number, number]
) => {
  // i need the indices, symbol and direction of one of the first legal moves
  const { indexY, indexX, symbol, originMove } = getFistLegalMove(
    rows,
    startingIndex[0],
    startingIndex[1]
  );

  let currentIndexY = indexY;
  let currentIndexX = indexX;
  let currentSymbol = symbol;
  let currentOriginMove = originMove;
  let stepCount = 1;

  while (
    currentIndexX != startingIndex[1] ||
    currentIndexY != startingIndex[0]
  ) {
    const { nextIndexX, nextIndexY, nextSymbol, nextOriginMove } = getNextStep(
      currentIndexY,
      currentIndexX,
      currentSymbol,
      currentOriginMove,
      rows
    );

    currentIndexX = nextIndexX;
    currentIndexY = nextIndexY;
    currentSymbol = nextSymbol;
    currentOriginMove = nextOriginMove;

    stepCount++;
  }

  console.log("The farthest from the start is: ", stepCount / 2);
};

const getNextStep = (
  indexY: number,
  indexX: number,
  symbol: string,
  originMove: string,
  rows: string[]
): {
  nextIndexX: number;
  nextIndexY: number;
  nextSymbol: string;
  nextOriginMove: string;
} => {
  const result = {
    nextIndexX: indexX,
    nextIndexY: indexY,
    nextSymbol: symbol,
    nextOriginMove: originMove,
  };

  const pathModifiers = pathModifiersBySymbolsAndOrigins[symbol][originMove];

  result.nextIndexX += pathModifiers.modifier[1];
  result.nextIndexY += pathModifiers.modifier[0];
  result.nextSymbol = rows[result.nextIndexY][result.nextIndexX];
  result.nextOriginMove = pathModifiers.nextDirection;

  return result;
};

const getFistLegalMove = (
  rows: string[],
  startingIndexY: number,
  startingIndexX: number
): { indexY: number; indexX: number; symbol: string; originMove: string } => {
  // left case
  const result = {
    indexY: startingIndexY,
    indexX: startingIndexX - 1,
    symbol: rows[startingIndexY][startingIndexX - 1],
    originMove: "right",
  };

  // if at any point the program dies here, we have to check array boundaries
  if (
    legalNeighbours.above.includes(rows[startingIndexY - 1][startingIndexX])
  ) {
    result.indexY = startingIndexY - 1;
    result.indexX = startingIndexX;
    result.symbol = rows[startingIndexY - 1][startingIndexX];
    result.originMove = "below";
  } else if (
    legalNeighbours.right.includes(rows[startingIndexY][startingIndexX + 1])
  ) {
    result.indexY = startingIndexY;
    result.indexX = startingIndexX + 1;
    result.symbol = rows[startingIndexY][startingIndexX + 1];
    result.originMove = "left";
  } else if (
    legalNeighbours.below.includes(rows[startingIndexY + 1][startingIndexX])
  ) {
    result.indexY = startingIndexY + 1;
    result.indexX = startingIndexX;
    result.symbol = rows[startingIndexY + 1][startingIndexX];
    result.originMove = "above";
  }

  return result;
};

const findStartingIndex = (rows: string[]): [number, number] => {
  const result: number[] = [];

  rows.every((row, index) => {
    if (row.indexOf("S") != -1) {
      result.push(index);
      result.push(row.indexOf("S"));

      // hack to break the loop
      return false;
    }

    return true;
  });

  return result as [number, number];
};

main(rows);
