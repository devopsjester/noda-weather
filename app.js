
const yargs = require('yargs');
const gw = require('./getWeather');

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


gw.getWeather(options);
