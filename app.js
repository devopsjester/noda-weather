const zipcode = process.argv[2] || '10001';
console.log(`The zipcode entered is: ${zipcode}`);

// get the latitude and longitude from the zipcode
const geocode = require('./geocode');
geocode.getLatLong(zipcode, (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});

// get the weather from the latitude and longitude

