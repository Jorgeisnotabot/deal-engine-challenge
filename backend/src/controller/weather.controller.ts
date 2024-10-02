import { Request, Response } from "express";
import { getWeatherForAllTicketsInBatches } from "../services/weather-service.js";
import { Ticket, WeatherReport } from "../types.js";
import { parseTicketsData } from "../utils/csv-parser.js";  // Import the parser
import path from "path";

export const getWeatherReportsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tickets: Ticket[] = req.body.tickets;
        const batchSize = 30;
       

        if (!tickets || tickets.length === 0) {
            res.status(400).json({ message: "Tickets are required" });
            return;
        }

        // Get weather data for all tickets
        const weatherReports:WeatherReport[] = [];

        // Batch and fetch weather data
        for (let i = 0; i < tickets.length; i += batchSize) {
            const batch = tickets.slice(i, i + batchSize);

            // Fetch weather data for the batch
            const batchWeatherReports = await getWeatherForAllTicketsInBatches(batch, batchSize);
            // Push the weather reports to the main array
            weatherReports.push(...batchWeatherReports);
            console.log(weatherReports)
            // Send partial data to the client while waiting for the rest
            res.write(JSON.stringify(weatherReports));
        }



        // Send the weather reports in the response
        res.end();
    } catch (error) {
        console.error("Error getting weather reports:", error);
        res.status(500).json({ message: "Failed to fetch weather reports" });
    }
};