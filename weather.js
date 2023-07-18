async function getCurrentWeather(lat, lon) {
    const apiKey = '1b123c9a91468b0da3e0a39c238b2a01'; // replace with your own API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data.main.temp;
    return temperature;
}

module.exports = {
    getCurrentWeather
};