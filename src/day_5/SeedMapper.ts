export default class SeedMapper {
  private currentValue: number;

  constructor(seed: number) {
    this.currentValue = seed;
  }

  public mapToNewValue = (map: number[][]) => {
    const matchingRow = this.findMatchingRow(map, this.currentValue);

    if (matchingRow !== undefined) {
      this.currentValue = this.calculateValueFromRow(matchingRow, this.currentValue);
    }
  }

  public get getCurrentValue() {
    return this.currentValue;
  }

  private calculateValueFromRow(row: number[], valueToUpdate: number): number {
    const difference = valueToUpdate - row[1];

    return row[0] + difference;
  }

  private findMatchingRow = (map: number[][], numberToMatch: number): number[] => {
    return map.filter(row => {
      return numberToMatch >= row[1]  && numberToMatch <= row[1] + row[2] - 1;
    })[0];
  }
}
