const getLatLongFromCityState = async (location) => {
    const city = encodeURIComponent(location.split(',')[0].trim());
    const state = encodeURIComponent(location.split(',')[1].trim());
    const url = `https://api.zippopotam.us/us/${state}/${city}`;
    const { lat, long } = await getLocationFrom(url);

    return { lat, long }
};

const getLatLongFromZip = async (zip) => {
    const url = `https://api.zippopotam.us/us/${zip}`;
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