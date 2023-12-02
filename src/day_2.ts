import * as fs from 'fs';
import { EOL } from 'os';

const fileContent = fs.readFileSync('./inputs/day_2_input.txt', 'utf-8');

const rows = fileContent.split(EOL);

main(rows);

function main(rows: string[]) {
  const possibleGames: string[] = [];
  let powerOfFewestPossibleDices = 0
  console.log(rows[0]);

  rows.forEach((row) => {
    const gameStatistics = getGameStatistics(row);
    if (gameStatistics.isPossible) {
      possibleGames.push(row);
    }

    // part 2
    powerOfFewestPossibleDices = gameStatistics.powerOfFewestDices + powerOfFewestPossibleDices;
  })

  const firstGameResult = possibleGames.reduce((sumOfPossibleGameNumbers, current) => {
    return sumOfPossibleGameNumbers + parseInt(current.slice(0, 2));
  }, 0);

  console.log("The sum of the possible games is: ", firstGameResult);
  console.log("The power of the fewest dices: ", powerOfFewestPossibleDices)
}

function getGameStatistics(gamesRow: string): { isPossible: boolean, powerOfFewestDices: number } {
  let result = true;


  const games = gamesRow.slice(gamesRow.indexOf(' ')).split(';');
  games.forEach(game => {
    const currentGame = game.split(', ')

    if (!isGamePossible(currentGame)) {
      result = false;
    }
  })

  // part 2 logic
  const powerOfFewestPossibleDices = getPowerOfFewestPossibleDices(games);

  return { isPossible: result, powerOfFewestDices: powerOfFewestPossibleDices };
}

function getPowerOfFewestPossibleDices(games: string[]): number {
  const fewestPossibleDices: {[key: string]: number} = {
    red: 0,
    green: 0,
    blue: 0
  }

  games.forEach((game) => {
    const currentGame = game.split(', ');
    currentGame.forEach(color => {
      color = color.trimStart()
      const colorValues = color.split(' ');
      if (fewestPossibleDices[colorValues[1]] < parseInt(colorValues[0])) {
        fewestPossibleDices[colorValues[1]] = parseInt(colorValues[0]);
      }
    })
  })

  return fewestPossibleDices['red'] * fewestPossibleDices['blue'] * fewestPossibleDices['green'];
}

function isGamePossible(game: string[]): boolean {
  const possibleValues: {[key: string]: number} = {
    red: 12,
    green: 13,
    blue: 14,
  }
  let result = true;

  game.forEach(dices => {
    dices = dices.trimStart();
    const diceValue = dices.split(' ');

    if (possibleValues[diceValue[1]] < parseInt(diceValue[0])) {
      result = false;
    }
  })

  return result;
}
