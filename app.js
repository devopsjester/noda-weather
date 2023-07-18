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
        describe: 'Get weather for a city',
        type: 'string'
    })
    .option('state', {
        alias: 's',
        describe: 'Get weather for a state',
        type: 'string'
    })
    .option('country', {
        alias: 'ctr',
        describe: 'Get weather for a country',
        type: 'string',
        default: 'US'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

async function getWeather() {
    let latitude, longitude;
    if (options.zipcode && !(options.city && options.state)) {
        const { lat, long } = await geocode.getLatLongFromZip(options.zipcode, options.country);
        latitude = lat;
        longitude = long;
    } else if (options.city && options.state && !options.zipcode) {
        const { lat, long } = await geocode.getLatLongFromCityState(options.city, options.state, options.country);
        latitude = lat;
        longitude = long;
    } else {
        console.error('Please specify either a zip code or a city and state');
        return;
    }
    const temperature = await weather.getCurrentWeather(latitude, longitude, options.country);
    console.log(`The temperature is ${temperature}.`);
}

getWeather();