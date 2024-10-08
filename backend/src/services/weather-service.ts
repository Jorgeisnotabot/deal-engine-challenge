import axios from 'axios';
import NodeCache from "node-cache";
import { config } from 'dotenv';
import { Ticket, WeatherReport } from "../types.js";

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


export const getWeatherWithRetry = async (lat: number, lon: number, retries = 3): Promise<any> => {
    try {
        return await getWeatherData(lat, lon);
    } catch (error) {
        if (retries > 0) {
            console.log(`Retrying... ${retries} retries left`);
            return getWeatherWithRetry(lat, lon, retries - 1);
        } else {
            throw new Error("Failed to fetch weather data");
        }
    }
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

    const weatherData = await getWeatherWithRetry(lat, lon);

    // Cache the data for future requests
    weatherDataCache.set(cacheKey, weatherData);

    return weatherData;
}


// GET Weather for all tickets

/// Remove this function later to avoid hitting the rate limit of the OpenWeather API

// This function needs to improve performance by fetching weather data for all tickets in parallel using Promise.all

// Fetch weather data for all tickets in parallel
export const getWeatherForAllTickets = async (tickets: Ticket[]): Promise<WeatherReport[]> => {
    // Map each ticket to a promise that fetches weather data for both origin and destination airports
    const weatherPromises = tickets.map(async (ticket) => {
        const originWeatherData = await getCachedWeatherData(ticket.originAirport.latitude, ticket.originAirport.longitude);
        const destinationWeatherData = await getCachedWeatherData(ticket.destinationAirport.latitude, ticket.destinationAirport.longitude);
        return {
            ticket,
            originWeather: originWeatherData,
            destinationWeather: destinationWeatherData
        } as WeatherReport;
    });

    // Use Promise.all to resolve all promises in parallel

    try {
        const weatherResults = await Promise.all(weatherPromises);
        return weatherResults;
    } catch (error) {
        console.error("Failed to fetch weather data", error);
        throw new Error("Failed to fetch weather data");
    }

   
}

// We need to adjust the batch size based on a safe number of tickets to avoid hitting the rate limit of the OpenWeather API.
// For example, if the rate limit is 60 requests per minute, we can set the batch size to 30 tickets per batch to stay within the limit.

// Helper function to delay execution for a specified time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Batch the requests to avoid hitting the rate limit

export const getWeatherForAllTicketsInBatches = async (tickets: Ticket[], batchSize: number): Promise<WeatherReport[]> => {
    const weatherReports: WeatherReport[] = [];

    // Split the tickets into batches of the specified size

    for (let i = 0; i < tickets.length; i += batchSize) {
        const batch = tickets.slice(i, i + batchSize);

        const weatherPromises = batch.map(async (ticket) => {
            const originWeatherData = await getCachedWeatherData(ticket.originAirport.latitude, ticket.originAirport.longitude);
            const destinationWeatherData = await getCachedWeatherData(ticket.destinationAirport.latitude, ticket.destinationAirport.longitude);
            return {
                ticket,
                originWeather: originWeatherData,
                destinationWeather: destinationWeatherData
            } as WeatherReport;
        });

        const batchWeatherReports = await Promise.all(weatherPromises);
        weatherReports.push(...batchWeatherReports);

        if (i + batchSize < tickets.length) {
            console.log("Delaying execution for 1 minute to avoid rate limit");
            await delay(60000);
        }

        // Delay execution for 1 minute to avoid hitting the rate limit
        await delay(60000);
    }


    return weatherReports;
}


