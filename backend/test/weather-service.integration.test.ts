import axios from 'axios';
import { getWeatherData } from '../src/services/weather-service';


describe('Integration test for getWeatherData', () => {
    const mockLat = 25.7617;
    const mockLon = 80.1918;

    it('should fetch data from OpenWeather API', async () => {
        try {
            const response = await getWeatherData(mockLat, mockLon);
            expect(response).toBeDefined();
            expect(response.weather).toBeInstanceOf(Array);
            expect(response.main).toHaveProperty('temp');
            expect(response).toHaveProperty('name');
            console.log('Weather data:', response);
        } catch (error) {
            console.error('Error while fetching weather data:', error);
            throw new Error('Failed to fetch weather data from OpenWeather API');

        }
    }
    )
})