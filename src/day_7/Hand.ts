import Card from "./Card"
import HandType from "./HandType"

export default class Hand {
  private _hand: Card[];
  private _type: HandType;
  private _bid: number;
  private _rawHand: string;

  constructor(handInput: string, bid: number) {
    this._hand = this.parseHandInput(handInput);
    this._type = this.calculateHandType(this._hand);
    this._bid = bid;
    this._rawHand = handInput;
  }

  private parseHandInput = (hand: string): Card[] => {
    return hand.split('').map((card) => new Card(card))
  }

  private calculateHandType = (hand: Card[]): HandType => {
    const handMap: {[key: string]: number} = {};
    // J erteket hozza kell adni a legnagyobb szamhoz

    for (const card of hand) {
      if (!handMap.hasOwnProperty(card.name)) {
        handMap[card.name] = 1;
      } else {
        handMap[card.name]++;
      }
    }

    const types: {[key in HandType]: number[]} = {
      'HighCard': [1, 1, 1, 1, 1],
      'FiveOfAKind': [5],
      'FourOfAKind': [1, 4],
      'FullHouse': [2, 3],
      'ThreeOfAKind': [1, 1, 3],
      'TwoPair': [1, 2, 2],
      'OnePair': [1, 1, 1, 2]
    }

    // part 2 tweak
    this.recalculateByJokers(handMap);

    const cardCountsAscending = Object.values(handMap).sort();

    for (const type in types) {
      if (types[type as HandType].every((count, index) => count === cardCountsAscending[index])) {
        return type as HandType;
      }
    }
  }

  private recalculateByJokers = (handMap: {[key: string]: number}) => {
    if (!handMap.hasOwnProperty('J')) {
      return;
    }

    let highestKey: string = undefined;

    for (const card in handMap) {
      if (card !== 'J' && highestKey === undefined) {
        highestKey = card;
      }

      if (card !== 'J' && handMap[highestKey] < handMap[card]) {
        highestKey = card;
      }
    }

    if (highestKey === undefined) {
      return;
    }

    handMap[highestKey] += handMap['J'];
    delete handMap['J'];
  }

  get hand() {
    return this._hand;
  }

  get type() {
    return this._type;
  }

  get bid() {
    return this._bid;
  }

  get rawHand() {
    return this._rawHand;
  }
}