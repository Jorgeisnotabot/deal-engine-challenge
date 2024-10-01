import { getCachedWeatherData } from "../services/weather-service.js";
import { Ticket } from "../types.js";

// Get weather data for a list of tickets
// This function needs to improve performance by fetching weather data for all tickets in parallel using Promise.all

export const getWeatherForAllTickets = async (tickets: Ticket[]) => {
    // Map each ticket to a promise that fetches weather data
    const weatherPromises = tickets.map(async (ticket) => {
        return getCachedWeatherData(ticket.originAirport.latitude, ticket.originAirport.longitude);
    });

    // Wait for all promises to resolve
    const weatherResults = await Promise.all(weatherPromises);
    return weatherResults;
}