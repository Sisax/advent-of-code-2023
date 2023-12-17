// f me
import * as fs from "fs";
import { EOL } from "os";
import Node from "./Node";

const fileContent = fs.readFileSync("../inputs/day_17_test_input.txt", "utf-8");
const map = fileContent
  .split(EOL)
  .map((row, i) =>
    row.split("").map((block, j) => new Node(i, j, parseInt(block)))
  );

const printedMap = fileContent.split(EOL).map((row) => row.split(""));

map.forEach((row) => {
  row.forEach((node) => {
    node.calculateNeighbours(map);
  });
});

const start = map[0][0];
start.distance = 0;
start.isUnvisited = false;
const end = map[map.length - 1][map[0].length - 1];

const unvisitedNeighbors: Node[] = [...start.neighbors];

unvisitedNeighbors.forEach((neighbor) => {
  neighbor.distance = neighbor.point + 0;
  neighbor.previous = start;
});

let currentNode = start;

while (unvisitedNeighbors.length > 0) {
  let lowestDistance = 0;

  for (let i = 0; i < unvisitedNeighbors.length; i++) {
    if (
      unvisitedNeighbors[i].point + unvisitedNeighbors[i].previous.distance <
      unvisitedNeighbors[lowestDistance].point +
        unvisitedNeighbors[lowestDistance].previous.distance
    ) {
      lowestDistance = i;
    }
  }

  currentNode = unvisitedNeighbors[lowestDistance];
  console.log(currentNode);
  currentNode.isUnvisited = false;
  currentNode.distance = currentNode.previous.distance + currentNode.point;
  unvisitedNeighbors.splice(lowestDistance, 1);

  // i think this is fine because end's neighbors have the reference
  if (currentNode === end) {
    console.log(currentNode.distance);
    while (currentNode.previous !== undefined) {
      printedMap[currentNode.i][currentNode.j] = "#";
      currentNode = currentNode.previous;
    }
    break;
  }

  const newUnvisitedNeighbors = currentNode.neighbors.filter(
    (neighbor) => neighbor.isUnvisited
  );

  newUnvisitedNeighbors.forEach((neighbor) => {
    neighbor.previous = currentNode;
  });
  unvisitedNeighbors.push(...newUnvisitedNeighbors);
}

console.log(printedMap.join(EOL));
