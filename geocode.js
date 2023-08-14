const getLatLongFromCityState = async (city, state, country) => {
    try {
        const encodedCity = encodeURIComponent(city.trim());
        const encodedState = encodeURIComponent(state.trim());
        const encodedCountry = encodeURIComponent(country.trim());
        const url = `https://api.zippopotam.us/${encodedCountry}/${encodedState}/${encodedCity}`;
        const { lat, long } = await getLocationFrom(url);

        return { lat, long };
    } catch (error) {
        console.error(error);
        throw new Error('Invalid input. Please provide a valid city, state, and country.');
    }
};

const getLatLongFromZip = async (zip, country) => {
    try {
        const encodedCountry = encodeURIComponent(country.trim());
        const url = `https://api.zippopotam.us/${encodedCountry}/${zip}`;
        const { lat, long } = await getLocationFrom(url);

        return { lat, long };
    } catch (error) {
        console.error(error);
        throw new Error('Invalid input. Please provide a valid zip code and country.');
    }
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