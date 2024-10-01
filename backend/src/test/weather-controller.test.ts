// Test getCachedWeatherData function

import { getCachedWeatherData } from "../controller/weather.controller.js";

describe('Unit test for getCachedWeatherData', () => {
    const mockLat = 19.4363;
    const mockLon = -99.0721;

    it('should fetch data from OpenWeather API and cache it', async () => {
        try {
            const response = await getCachedWeatherData(mockLat, mockLon);
            expect(response).toBeDefined();
            expect(response.weather).toBeInstanceOf(Array);
            expect(response.main).toHaveProperty('temp');
            expect(response).toHaveProperty('name');
            console.log('Weather data:', response);
        } catch (error) {
            console.error('Error while fetching weather data:', error);
            throw new Error('Failed to fetch weather data from OpenWeather API');
        }
    })
})