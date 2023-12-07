import * as fs from 'fs';
import { EOL } from 'os';
import Hand from './Hand'

const fileContent = fs.readFileSync('../inputs/day_7_input.txt', 'utf-8');

const rows = fileContent.split(EOL);

main(rows);

function main(rows: string[]) {
  const hands: Hand[] = [];
  rows.forEach(row => {
    const [rawHand, bid] = row.split(' ');
    hands.push(new Hand(rawHand, parseInt(bid)));
  })

  const fiveOfAKinds = hands.filter(hand => hand.type === 'FiveOfAKind').sort(sortByCardRanks);
  const fourOfAKinds = hands.filter(hand => hand.type === 'FourOfAKind').sort(sortByCardRanks);
  const fullHouses = hands.filter(hand => hand.type === 'FullHouse').sort(sortByCardRanks);
  const threeOfAKinds = hands.filter(hand => hand.type === 'ThreeOfAKind').sort(sortByCardRanks);
  const twoPairs = hands.filter(hand => hand.type === 'TwoPair').sort(sortByCardRanks);
  const onePairs = hands.filter(hand => hand.type === 'OnePair').sort(sortByCardRanks);
  const highCards = hands.filter(hand => hand.type === 'HighCard').sort(sortByCardRanks);

  const allCardsSorted = [...highCards, ...onePairs, ...twoPairs, ...threeOfAKinds, ...fullHouses, ...fourOfAKinds, ...fiveOfAKinds];

  console.log(allCardsSorted);
  const bidsWon = allCardsSorted.map((hand, index) => {
    return hand.bid * (index + 1)
  });
  const overAllWon = bidsWon.reduce((prev, curr) => prev + curr, 0);

  console.log('Bids won over all: ', overAllWon);
}

function findFirstNonEqualElements(arr1: number[], arr2: number[]) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return [arr1[i], arr2[i]];
    }
  }

  return null;
}

function sortByCardRanks(handA: Hand, handB: Hand): number {
  const Ahands = handA.hand.map(card => card.rank)
  const Bhands = handB.hand.map(card => card.rank)
  const [diffA, diffB] = findFirstNonEqualElements(Ahands, Bhands)

  return diffA - diffB;
}