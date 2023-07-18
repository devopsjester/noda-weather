const geocode = require('./geocode');
const weather = require('./weather');

const location = process.argv[2] || '10001';

async function getWeather(location) {
    let latitude, longitude;
    if (isNaN(location)) {
        const { lat, long } = await geocode.getLatLongFromCityState(location);
        latitude = lat;
        longitude = long;
    } else {
        const { lat, long } = await geocode.getLatLongFromZip(location);
        latitude = lat;
        longitude = long;
    }
    const temperature = await weather.getCurrentWeather(latitude, longitude);
    console.log(`The temperature in ${location} is ${temperature}F.`);
}

getWeather(location);


