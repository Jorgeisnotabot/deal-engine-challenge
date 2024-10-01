import axios from 'axios';
import NodeCache from "node-cache";
import { config } from 'dotenv';
config();

// Get the API key from the environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Base URL for the OpenWeather API
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

// Function to fetch weather data from the OpenWeather API
export const getWeatherData = async (lat: number, lon: number) => {
    const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`; 
    const response = await axios.get(url);
    return response.data;
}

// Using a cache to store weather data

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

