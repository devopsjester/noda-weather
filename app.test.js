const app = require('./getWeather');
const geocode = require('./geocode');
const weather = require('./weather');

jest.mock('./geocode');
jest.mock('./weather');

describe('getWeather', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('gets weather by zip code', async () => {
    const options = { zipcode: '10001', z: '10001', country: 'US', ctr: 'US', _:[], '$0': 'app.js'  };
    geocode.getLatLongFromZip.mockResolvedValueOnce({ lat: 40.7128, long: -74.006 });
    weather.getCurrentWeather.mockResolvedValueOnce(72);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await app.getWeather(options);

    expect(geocode.getLatLongFromZip).toHaveBeenCalledWith('10001', 'US');
    expect(weather.getCurrentWeather).toHaveBeenCalledWith(40.7128, -74.006, 'US');
    expect(console.log).toHaveBeenCalledWith('The temperature is 72.');
  });

  test('gets weather by city and state', async () => {
    const options = { city: 'New York', state: 'NY', country: 'US', ctr: 'US', _:[], '$0': 'app.js' };
    geocode.getLatLongFromCityState.mockResolvedValueOnce({ lat: 40.7128, long: -74.006 });
    weather.getCurrentWeather.mockResolvedValueOnce(72);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await app.getWeather(options);

    expect(geocode.getLatLongFromCityState).toHaveBeenCalledWith('New York', 'NY', 'US');
    expect(weather.getCurrentWeather).toHaveBeenCalledWith(40.7128, -74.006, 'US');
    expect(console.log).toHaveBeenCalledWith('The temperature is 72.');
  });

  test('handles errors', async () => {
    const options = { zipcode: 'invalid', z: 'invalid', country: 'US', ctr: 'US', _:[], '$0': 'app.js'};
    geocode.getLatLongFromZip.mockRejectedValueOnce(new Error('Invalid zip code'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await app.getWeather(options);

    expect(console.error).toHaveBeenCalledWith('Error: Invalid zip code');
  });
});