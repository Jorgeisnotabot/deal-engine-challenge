import { Request, Response } from "express";
import { getWeatherForAllTickets } from "../services/weather-service.js";
import { Ticket } from "../types.js";
import { parseTicketsData } from "../utils/csv-parser.js";  // Import the parser
import path from "path";

export const getWeatherReportsController = async (req: Request, res: Response): Promise<void> => {
    try {
        // const tickets: Ticket[] = req.body.tickets;

        // Assuming the CSV file is uploaded and accessible on the server
        const filePath = path.resolve("./backend/data/dataset.csv");

        // Parse the CSV to get the array of tickets
        const tickets: Ticket[] = await parseTicketsData(filePath);


        if (!tickets || tickets.length === 0) {
            res.status(400).json({ message: "Tickets are required" });
            return;
        }

        // Get weather data for all tickets
        const weatherReports = await getWeatherForAllTickets(tickets);

        // Send the weather reports in the response
        res.status(200).json(weatherReports);
    } catch (error) {
        console.error("Error getting weather reports:", error);
        res.status(500).json({ message: "Failed to fetch weather reports" });
    }
};