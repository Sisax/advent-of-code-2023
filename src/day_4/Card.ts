export default class Card {
  private yourNumbers: number[];
  private winningNumbers: number[];
  private matchingNumbers: number[];
  public numberOfCards: number;

  constructor(yourNumbers: number[], winningNumbers: number[], numberOfCards: number = 0) {
    this.yourNumbers = yourNumbers;
    this.winningNumbers = winningNumbers;
    this.matchingNumbers = this.calculateMatchingNumbers();
    this.numberOfCards = numberOfCards;
  }

  public getCardPoints(): number {
    if (this.matchingNumbers.length === 0) {
      return 0;
    }

    let result = 1;

    for (let i = 1; i < this.matchingNumbers.length; i++) {
      result = result * 2;
    }

    return result;
  }

  public getMatchingNumbersLength(): number {
    return this.matchingNumbers.length;
  }

  private calculateMatchingNumbers(): number[] {
    const result: number[] = [];

    this.yourNumbers.forEach(number => {
      if (this.winningNumbers.includes(number)) {
        result.push(number)
      }
    })

    return result.filter((value, index) => result.indexOf(value) === index);
  }
}
