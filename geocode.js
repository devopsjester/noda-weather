const getLatLongFromCityState = async (city, state, country) => {
    const encodedCity = encodeURIComponent(city.trim());
    const encodedState = encodeURIComponent(state.trim());
    const encodedCountry = encodeURIComponent(country.trim());
    const url = `https://api.zippopotam.us/${encodedCountry}/${encodedState}/${encodedCity}`;
    const { lat, long } = await getLocationFrom(url);

    return { lat, long }
};

const getLatLongFromZip = async (zip, country) => {
    const encodedCountry = encodeURIComponent(country.trim());
    const url = `https://api.zippopotam.us/${encodedCountry}/${zip}`;
    const { lat, long } = await getLocationFrom(url);

    return { lat, long };
};

async function getLocationFrom(url) {
    const response = await fetch(url);
    const data = await response.json();
    const lat = data.places[0]['latitude'];
    const long = data.places[0]['longitude'];
    return { lat, long };
}

module.exports = {
    getLatLongFromCityState,
    getLatLongFromZip
};