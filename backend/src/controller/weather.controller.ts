import { getCachedWeatherData } from "../services/weather-service.js";
import { Ticket, WeatherReport } from "../types.js";

// Get weather data for a list of tickets
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

