async function getCurrentWeather(lat, lon, country) {
    const apiKey = '1b123c9a91468b0da3e0a39c238b2a01'; // replace with your own API key
    let units = 'metric';
    let unitSymbol = '°C';
    if (country === 'US') {
        units = 'imperial';
        unitSymbol = '°F';
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    return `${temperature}${unitSymbol}`;
}

module.exports = {
    getCurrentWeather
};