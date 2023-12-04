import Card from "./Card";

export default class PointCounter {
  private cardsForPartOne: Card[];
  private cards: Card[];
  private totalPoints: number = 0;
  private totalNumberOfCards: number = 0;

  constructor(rawData: string[]) {
    this.cardsForPartOne = this.createCardsForPartOne(rawData);
    this.totalPoints = this.countTotalPoints();
    this.cards = this.createCardsForPartTwo(rawData);
    this.totalNumberOfCards = this.countTotalNumberOfCards();
  }

  private createCardsForPartTwo(rawData: string[]): Card[] {
    const result: Card[] = [];
    const numberOfNextCards: {[key: number]: number} = {};

    rawData.forEach((cardData, index) => {
      const { yourNumbers, winningNumbers } = this.processRawCardData(cardData);
      const cardNumberForCurrentCard = numberOfNextCards[index] ?? 0;
      const scratchCard = new Card(yourNumbers, winningNumbers, cardNumberForCurrentCard + 1);
      const cardsWon = scratchCard.getMatchingNumbersLength();
      for (let i = 1; i <= cardsWon; i++) {
        if (!numberOfNextCards.hasOwnProperty(index + i)) {
          numberOfNextCards[index + i] = 0;
        }
        numberOfNextCards[index + i] = numberOfNextCards[index + i] + scratchCard.numberOfCards;
      }
      result.push(scratchCard);
    })

    return result;
  }

  private createCardsForPartOne(rawData: string[]): Card[] {
    const result: Card[] = [];

    rawData.forEach(cardData => {
      const { yourNumbers, winningNumbers } = this.processRawCardData(cardData);
      const scratchCard = new Card(yourNumbers, winningNumbers);
      result.push(scratchCard);
    })

    return result;
  }

  private processRawCardData(cardData: string): { yourNumbers: number[], winningNumbers: number[] } {
    const sides = cardData.split(' | ');
    const yourNumbers = sides[1].split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));
    const winningNumbers = sides[0].split(' ').map(number => parseInt(number)).filter(number => !isNaN(number));

    return { yourNumbers, winningNumbers };
  }

  private countTotalPoints(): number {
    let result = 0;

    this.cardsForPartOne.forEach(card => {
      result += card.getCardPoints();
    })

    return result;
  }

  private countTotalNumberOfCards(): number {
    return this.cards.reduce((prev, curr) => prev + curr.numberOfCards, 0)
  }

  public printResultForPartTwo(): void {
    console.log("The total number of cards for part two is: " + this.totalNumberOfCards);
  }

  public printResult(): void {
    console.log("The total points of scratch cards is: " + this.totalPoints);
  }
}
