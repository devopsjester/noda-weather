// geocode.js

const request = require('request');

const getLatLong = (zipcode, callback) => {
    // use zipopotam.us to get the latitude and longitude
    const url = `http://api.zippopotam.us/us/${zipcode}`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { latitude, longitude } = response.body.places[0];
            callback(undefined, { latitude, longitude });
        }
    });
};


module.exports = {
    getLatLong
};