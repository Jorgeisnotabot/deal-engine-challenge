import NodeCache from "node-cache";
import { Ticket, WeatherReport } from "../types.js";
import { getWeatherData } from "../services/weather-service.js";

// Set up a cache with a TTL of 1 hour
const weatherDataCache = new NodeCache({ stdTTL: 3600 });

// Add caching to the getWeatherData function

export const getCachedWeatherData = async (lat: number, lon: number) => {
    // set a key for the cache
    const cacheKey = `${lat}-${lon}`;
    // Check if the data is already cached
    const cachedData = weatherDataCache.get(cacheKey);

    // If data is cached, return it
    if (cachedData) {
        return cachedData;
    }

    // If data is not cached, fetch it from the API

    const weatherData = await getWeatherData(lat, lon);

    // Cache the data for future requests
    weatherDataCache.set(cacheKey, weatherData);

    return weatherData;
}
