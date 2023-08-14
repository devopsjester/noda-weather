const geocode = require('./geocode');
const weather = require('./weather');

async function getWeather(options) {
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

module.exports = { getWeather }