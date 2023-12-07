export default class Card {
  private _name: string;
  private _rank: number;

  constructor(name: string) {
    this._name = name;
    this._rank = this.getRankByName(name);
  }

  private getRankByName(name: string) {
    const ranksByName: {[key: string]: number} = {
      'J': 0,
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
      '6': 5,
      '7': 6,
      '8': 7,
      '9': 8,
      'T': 9,
      'Q': 11,
      'K': 12,
      'A': 13,
      'default': -1,
    }

    return ranksByName.hasOwnProperty(name) ? ranksByName[name] : ranksByName['default'];
  }

  get name() {
    return this._name;
  }

  get rank() {
    return this._rank;
  }
}