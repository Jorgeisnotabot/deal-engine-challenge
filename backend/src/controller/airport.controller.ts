import { Request, Response } from 'express';
import { getAirportsData } from '../model/airport.model.js';

export const getAirports = async (req: Request, res: Response) => {
    try {
        const airports = await getAirportsData();
        res.status(200).json(airports);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Airports" });
    }
}