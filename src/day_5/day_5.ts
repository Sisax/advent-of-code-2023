import {
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation
} from '../inputs/day_5_inputs';
import SeedMapper from './SeedMapper';

// get the smallest location number
// if you can't map a value to anything, the value should stay the same

function main() {
  let lowestLocation: number = undefined;

  // part 2: iterate through seeds + n (second value of the seed tuple)
  seeds.forEach(seed => {

    const seedNumber = seed[1];
    for (let i = 0; i < seedNumber; i++) {
      // create new seedmapper instance
      // map to new value for each map
      // valuegetter
      // check if value is smaller than lowest or if lowest = undefined;
      const seedMapper = new SeedMapper(seed[0] + i);
      seedMapper.mapToNewValue(seedToSoil);
      seedMapper.mapToNewValue(soilToFertilizer);
      seedMapper.mapToNewValue(fertilizerToWater);
      seedMapper.mapToNewValue(waterToLight);
      seedMapper.mapToNewValue(lightToTemperature);
      seedMapper.mapToNewValue(temperatureToHumidity);
      seedMapper.mapToNewValue(humidityToLocation);

      const seedLocation = seedMapper.getCurrentValue;

      if (seedLocation < lowestLocation || lowestLocation == undefined) {
        lowestLocation = seedLocation;
      }
    }
  })

  console.log('The lowest location number is: ', lowestLocation);
}

main();
