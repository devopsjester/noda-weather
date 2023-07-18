const geocode = require('./geocode');
const weather = require('./weather');
const yargs = require('yargs');

const options = yargs
  .usage('Usage: $0 [location]')
  .option('zipcode', {
    alias: 'z',
    describe: 'Get weather for a zip code',
    type: 'string'
  })
  .option('city', {
    alias: 'c',
    describe: 'Get weather for a city and state',
    type: 'string'
  })
  .help('h')
  .alias('h', 'help')
  .argv;

async function getWeather() {
  let latitude, longitude;
  if (options.zipcode) {
    const { lat, long } = await geocode.getLatLongFromZip(options.zipcode);
    latitude = lat;
    longitude = long;
  } else if (options.city) {
    const { lat, long } = await geocode.getLatLongFromCityState(options.city);
    latitude = lat;
    longitude = long;
  } else {
    console.error('Please specify a zip code or city and state');
    return;
  }
  const temperature = await weather.getCurrentWeather(latitude, longitude);
  console.log(`The temperature is ${temperature}F.`);
}

getWeather();